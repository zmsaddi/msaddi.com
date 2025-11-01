/**
 * Lighthouse CI Configuration
 *
 * Performance testing configuration for MSADDI website
 */

module.exports = {
  ci: {
    collect: {
      // URL patterns to test
      url: [
        'http://localhost:3000/en',
        'http://localhost:3000/ar',
        'http://localhost:3000/tr',
        'http://localhost:3000/en/about',
        'http://localhost:3000/en/services',
        'http://localhost:3000/en/products',
        'http://localhost:3000/en/capabilities',
        'http://localhost:3000/en/contact',
        'http://localhost:3000/en/rfq',
      ],
      // Number of runs per URL
      numberOfRuns: 3,
      // Start server before testing
      startServerCommand: 'npm run build && npm run start',
      startServerReadyPattern: 'ready',
      startServerReadyTimeout: 30000,
      // Collect options
      settings: {
        preset: 'desktop',
        // Throttling
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
        // Screen emulation
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
      },
    },
    assert: {
      // Performance budgets
      assertions: {
        // Performance metrics
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],

        // Core Web Vitals
        'first-contentful-paint': ['error', { maxNumericValue: 1500 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'speed-index': ['error', { maxNumericValue: 3000 }],

        // Resource optimization
        'resource-summary:script:size': ['error', { maxNumericValue: 300000 }], // 300KB
        'resource-summary:image:size': ['error', { maxNumericValue: 500000 }], // 500KB
        'resource-summary:stylesheet:size': ['error', { maxNumericValue: 100000 }], // 100KB
        'resource-summary:total:size': ['error', { maxNumericValue: 1500000 }], // 1.5MB

        // Modern image formats
        'modern-image-formats': 'off', // Many images already optimized
        'uses-webp-images': 'off',

        // Critical rendering path
        'render-blocking-resources': 'off',
        'unused-css-rules': 'off',
        'unused-javascript': 'off',

        // Network optimization
        'uses-http2': ['error', { minScore: 1 }],
        'uses-long-cache-ttl': 'off', // Handled by Vercel
        'uses-text-compression': ['error', { minScore: 1 }],

        // Security
        'is-on-https': 'off', // Only in production
        'redirects-http': 'off',

        // Accessibility
        'aria-allowed-attr': ['error', { minScore: 1 }],
        'aria-required-attr': ['error', { minScore: 1 }],
        'color-contrast': ['error', { minScore: 0.9 }],
        'image-alt': ['error', { minScore: 1 }],
        'label': ['error', { minScore: 1 }],
        'link-name': ['error', { minScore: 1 }],

        // SEO
        'meta-description': ['error', { minScore: 1 }],
        'document-title': ['error', { minScore: 1 }],
        'html-has-lang': ['error', { minScore: 1 }],
        'hreflang': ['error', { minScore: 1 }],
        'canonical': 'off', // Not always needed

        // PWA (optional for Phase 4)
        'installable-manifest': 'off',
        'splash-screen': 'off',
        'themed-omnibox': 'off',
      },
    },
    upload: {
      // Store results temporarily (no server upload for now)
      target: 'temporary-public-storage',
    },
  },
};
