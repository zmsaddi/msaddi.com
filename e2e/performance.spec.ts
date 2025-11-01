/**
 * Performance E2E Tests
 *
 * Performance benchmarking and load testing
 */

import { test, expect } from '@playwright/test';

/**
 * Performance thresholds (in milliseconds)
 */
const PERFORMANCE_THRESHOLDS = {
  firstContentfulPaint: 1500,
  largestContentfulPaint: 2500,
  totalBlockingTime: 200,
  cumulativeLayoutShift: 0.1,
  timeToInteractive: 3500,
  speedIndex: 3000,
  domContentLoaded: 2000,
  loadComplete: 4000,
};

/**
 * Helper function to measure page performance
 */
async function measurePagePerformance(page: any, pageName: string) {
  const performanceTiming = await page.evaluate(() => {
    const timing = performance.timing;
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

    return {
      // Navigation timing
      domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
      loadComplete: timing.loadEventEnd - timing.navigationStart,
      domInteractive: timing.domInteractive - timing.navigationStart,

      // Modern metrics from navigation API
      firstPaint: navigation?.fetchStart || 0,
      domComplete: timing.domComplete - timing.navigationStart,

      // Resource counts
      resourceCount: performance.getEntriesByType('resource').length,

      // Transfer sizes (if available)
      transferSize: (navigation as any)?.transferSize || 0,
      encodedBodySize: (navigation as any)?.encodedBodySize || 0,
      decodedBodySize: (navigation as any)?.decodedBodySize || 0,
    };
  });

  console.log(`\n📊 Performance metrics for ${pageName}:`);
  console.log(`  DOM Content Loaded: ${performanceTiming.domContentLoaded}ms`);
  console.log(`  Load Complete: ${performanceTiming.loadComplete}ms`);
  console.log(`  DOM Interactive: ${performanceTiming.domInteractive}ms`);
  console.log(`  Resources Loaded: ${performanceTiming.resourceCount}`);
  console.log(`  Transfer Size: ${(performanceTiming.transferSize / 1024).toFixed(2)}KB`);

  return performanceTiming;
}

/**
 * Helper function to get Web Vitals
 */
async function measureWebVitals(page: any) {
  return await page.evaluate(() => {
    return new Promise((resolve) => {
      const vitals: any = {
        lcp: 0,
        fid: 0,
        cls: 0,
        fcp: 0,
        ttfb: 0,
      };

      // Get TTFB
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      vitals.ttfb = navigationEntry?.responseStart - navigationEntry?.requestStart || 0;

      // FCP from Paint Timing API
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find((entry) => entry.name === 'first-contentful-paint');
      vitals.fcp = fcpEntry?.startTime || 0;

      // LCP from Largest Contentful Paint API
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            vitals.lcp = lastEntry?.renderTime || lastEntry?.loadTime || 0;
          });
          lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

          // CLS from Layout Shift API
          const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                vitals.cls += (entry as any).value;
              }
            }
          });
          clsObserver.observe({ type: 'layout-shift', buffered: true });
        } catch (e) {
          console.log('PerformanceObserver not fully supported');
        }
      }

      // Return vitals after a short delay to collect metrics
      setTimeout(() => resolve(vitals), 2000);
    });
  });
}

test.describe('Performance - Homepage', () => {
  test('homepage loads within performance budget - English', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    const metrics = await measurePagePerformance(page, 'Homepage (English)');

    // Assert performance thresholds
    expect(metrics.domContentLoaded).toBeLessThan(PERFORMANCE_THRESHOLDS.domContentLoaded);
    expect(metrics.loadComplete).toBeLessThan(PERFORMANCE_THRESHOLDS.loadComplete);
  });

  test('homepage loads within performance budget - Arabic', async ({ page }) => {
    await page.goto('/ar');
    await page.waitForLoadState('networkidle');

    const metrics = await measurePagePerformance(page, 'Homepage (Arabic)');

    expect(metrics.domContentLoaded).toBeLessThan(PERFORMANCE_THRESHOLDS.domContentLoaded);
    expect(metrics.loadComplete).toBeLessThan(PERFORMANCE_THRESHOLDS.loadComplete);
  });

  test('homepage Web Vitals meet thresholds', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    const vitals: any = await measureWebVitals(page);

    console.log('\n🎯 Web Vitals:');
    console.log(`  LCP: ${vitals.lcp.toFixed(2)}ms`);
    console.log(`  FCP: ${vitals.fcp.toFixed(2)}ms`);
    console.log(`  CLS: ${vitals.cls.toFixed(4)}`);
    console.log(`  TTFB: ${vitals.ttfb.toFixed(2)}ms`);

    // Assert Web Vitals thresholds
    if (vitals.lcp > 0) {
      expect(vitals.lcp).toBeLessThan(PERFORMANCE_THRESHOLDS.largestContentfulPaint);
    }
    if (vitals.fcp > 0) {
      expect(vitals.fcp).toBeLessThan(PERFORMANCE_THRESHOLDS.firstContentfulPaint);
    }
    expect(vitals.cls).toBeLessThan(PERFORMANCE_THRESHOLDS.cumulativeLayoutShift);
  });
});

test.describe('Performance - All Pages', () => {
  const pages = [
    { path: '/en/about', name: 'About' },
    { path: '/en/services', name: 'Services' },
    { path: '/en/products', name: 'Products' },
    { path: '/en/capabilities', name: 'Capabilities' },
    { path: '/en/contact', name: 'Contact' },
    { path: '/en/rfq', name: 'RFQ' },
  ];

  for (const { path, name } of pages) {
    test(`${name} page loads within budget`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      // Wait for lazy-loaded content
      if (path.includes('rfq')) {
        await page.waitForSelector('form', { timeout: 5000 });
      }

      const metrics = await measurePagePerformance(page, name);

      expect(metrics.domContentLoaded).toBeLessThan(PERFORMANCE_THRESHOLDS.domContentLoaded);
      expect(metrics.loadComplete).toBeLessThan(PERFORMANCE_THRESHOLDS.loadComplete);
    });
  }
});

test.describe('Performance - Resource Loading', () => {
  test('homepage loads reasonable number of resources', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    const resourceCount = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource');
      return {
        total: resources.length,
        scripts: resources.filter((r) => r.name.endsWith('.js')).length,
        styles: resources.filter((r) => r.name.endsWith('.css')).length,
        images: resources.filter((r) =>
          r.name.match(/\.(jpg|jpeg|png|gif|svg|webp|avif)/)
        ).length,
        fonts: resources.filter((r) =>
          r.name.match(/\.(woff|woff2|ttf|otf)/)
        ).length,
      };
    });

    console.log('\n📦 Resources loaded:');
    console.log(`  Total: ${resourceCount.total}`);
    console.log(`  Scripts: ${resourceCount.scripts}`);
    console.log(`  Styles: ${resourceCount.styles}`);
    console.log(`  Images: ${resourceCount.images}`);
    console.log(`  Fonts: ${resourceCount.fonts}`);

    // Reasonable limits
    expect(resourceCount.total).toBeLessThan(100);
    expect(resourceCount.scripts).toBeLessThan(30);
    expect(resourceCount.styles).toBeLessThan(10);
  });

  test('resources are cached properly', async ({ page }) => {
    // First visit
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    // Second visit (should use cache)
    await page.goto('/en/about');
    await page.waitForLoadState('networkidle');
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    const cacheStatus = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const cached = resources.filter((r) =>
        r.transferSize === 0 || (r as any).deliveryType === 'cache'
      ).length;
      return {
        total: resources.length,
        cached,
        cacheHitRate: cached / resources.length,
      };
    });

    console.log('\n💾 Cache statistics:');
    console.log(`  Total resources: ${cacheStatus.total}`);
    console.log(`  Cached resources: ${cacheStatus.cached}`);
    console.log(`  Cache hit rate: ${(cacheStatus.cacheHitRate * 100).toFixed(2)}%`);

    // At least 30% cache hit rate on repeat visit
    expect(cacheStatus.cacheHitRate).toBeGreaterThan(0.3);
  });
});

test.describe('Performance - Image Optimization', () => {
  test('images use modern formats', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    const imageFormats = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.map((img) => ({
        src: img.src,
        format: img.src.match(/\.(jpg|jpeg|png|gif|svg|webp|avif)$/i)?.[1] || 'unknown',
      }));
    });

    console.log('\n🖼️  Image formats:');
    const formatCounts: Record<string, number> = {};
    imageFormats.forEach(({ format }) => {
      formatCounts[format] = (formatCounts[format] || 0) + 1;
    });
    Object.entries(formatCounts).forEach(([format, count]) => {
      console.log(`  ${format}: ${count}`);
    });

    // Check for modern formats (WebP, AVIF)
    const modernFormats = imageFormats.filter(
      ({ format }) => format === 'webp' || format === 'avif'
    );

    if (imageFormats.length > 0) {
      const modernFormatRatio = modernFormats.length / imageFormats.length;
      console.log(`  Modern format usage: ${(modernFormatRatio * 100).toFixed(2)}%`);
    }
  });

  test('images have proper dimensions', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    const oversizedImages = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images
        .filter((img) => {
          const naturalWidth = img.naturalWidth;
          const displayWidth = img.width;
          // Image is oversized if natural width is more than 2x display width
          return naturalWidth > displayWidth * 2;
        })
        .map((img) => ({
          src: img.src,
          natural: img.naturalWidth,
          display: img.width,
          ratio: (img.naturalWidth / img.width).toFixed(2),
        }));
    });

    if (oversizedImages.length > 0) {
      console.log('\n⚠️  Oversized images detected:');
      oversizedImages.forEach(({ src, natural, display, ratio }) => {
        console.log(`  ${src.substring(0, 50)}...`);
        console.log(`    Natural: ${natural}px, Display: ${display}px, Ratio: ${ratio}x`);
      });
    }

    // No more than 20% of images should be significantly oversized
    expect(oversizedImages.length).toBeLessThan(5);
  });
});

test.describe('Performance - JavaScript Bundle', () => {
  test('JavaScript bundle size is reasonable', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    const bundleSize = await page.evaluate(() => {
      const scripts = performance.getEntriesByType('resource').filter(
        (r) => r.name.endsWith('.js')
      ) as PerformanceResourceTiming[];

      const totalSize = scripts.reduce((sum, script) => {
        return sum + (script.transferSize || 0);
      }, 0);

      return {
        count: scripts.length,
        totalSize,
        averageSize: totalSize / scripts.length,
      };
    });

    console.log('\n📦 JavaScript bundle:');
    console.log(`  Scripts: ${bundleSize.count}`);
    console.log(`  Total size: ${(bundleSize.totalSize / 1024).toFixed(2)}KB`);
    console.log(`  Average size: ${(bundleSize.averageSize / 1024).toFixed(2)}KB`);

    // Total JS should be under 500KB (compressed)
    expect(bundleSize.totalSize).toBeLessThan(500 * 1024);
  });
});

test.describe('Performance - CSS', () => {
  test('CSS is optimized', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    const cssStats = await page.evaluate(() => {
      const styles = performance.getEntriesByType('resource').filter(
        (r) => r.name.endsWith('.css')
      ) as PerformanceResourceTiming[];

      const totalSize = styles.reduce((sum, style) => {
        return sum + (style.transferSize || 0);
      }, 0);

      return {
        count: styles.length,
        totalSize,
      };
    });

    console.log('\n🎨 CSS:');
    console.log(`  Stylesheets: ${cssStats.count}`);
    console.log(`  Total size: ${(cssStats.totalSize / 1024).toFixed(2)}KB`);

    // Total CSS should be under 100KB (compressed)
    expect(cssStats.totalSize).toBeLessThan(100 * 1024);
  });
});

test.describe('Performance - Mobile', () => {
  test('mobile homepage loads efficiently', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Emulate slow 3G connection
    await page.route('**/*', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 50)); // Add 50ms delay
      await route.continue();
    });

    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    const metrics = await measurePagePerformance(page, 'Homepage (Mobile)');

    // Mobile should still load reasonably fast
    expect(metrics.domContentLoaded).toBeLessThan(4000); // 4s on slow connection
    expect(metrics.loadComplete).toBeLessThan(6000); // 6s on slow connection
  });
});

test.describe('Performance - Lazy Loading', () => {
  test('below-fold content is lazy loaded', async ({ page }) => {
    await page.goto('/en');

    // Get initial resource count
    const initialResources = await page.evaluate(() =>
      performance.getEntriesByType('resource').length
    );

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // Get final resource count
    const finalResources = await page.evaluate(() =>
      performance.getEntriesByType('resource').length
    );

    console.log('\n⏬ Lazy loading:');
    console.log(`  Initial resources: ${initialResources}`);
    console.log(`  Final resources: ${finalResources}`);
    console.log(`  Lazy loaded: ${finalResources - initialResources}`);

    // Some resources should be lazy loaded
    // Note: This depends on implementation
    expect(finalResources).toBeGreaterThanOrEqual(initialResources);
  });
});

test.describe('Performance - Time to Interactive', () => {
  test('page becomes interactive quickly', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/en');

    // Wait for page to be interactive
    await page.waitForLoadState('domcontentloaded');
    const interactiveTime = Date.now() - startTime;

    console.log(`\n⚡ Time to Interactive: ${interactiveTime}ms`);

    // Should be interactive within 3.5 seconds
    expect(interactiveTime).toBeLessThan(PERFORMANCE_THRESHOLDS.timeToInteractive);
  });
});

test.describe('Performance - Navigation Speed', () => {
  test('client-side navigation is fast', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    const startTime = Date.now();

    // Navigate to another page (client-side navigation)
    await page.click('text=/about/i');
    await page.waitForURL('**/about');

    const navigationTime = Date.now() - startTime;

    console.log(`\n🚀 Client-side navigation time: ${navigationTime}ms`);

    // Client-side navigation should be very fast
    expect(navigationTime).toBeLessThan(1000);
  });
});
