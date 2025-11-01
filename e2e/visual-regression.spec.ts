/**
 * Visual Regression E2E Tests
 *
 * Screenshot comparison tests to catch visual changes
 */

import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Homepage', () => {
  test('homepage desktop - English', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    // Full page screenshot
    await expect(page).toHaveScreenshot('homepage-en-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('homepage desktop - Arabic (RTL)', async ({ page }) => {
    await page.goto('/ar');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-ar-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('homepage desktop - Turkish', async ({ page }) => {
    await page.goto('/tr');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-tr-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('homepage mobile - English', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-en-mobile.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('homepage mobile - Arabic (RTL)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/ar');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-ar-mobile.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });
});

test.describe('Visual Regression - RFQ Form', () => {
  test('RFQ form initial state', async ({ page }) => {
    await page.goto('/en/rfq');
    await page.waitForSelector('form', { timeout: 5000 });

    // Screenshot of form
    const form = page.locator('form');
    await expect(form).toHaveScreenshot('rfq-form-initial.png', {
      maxDiffPixels: 50,
    });
  });

  test('RFQ form with validation errors', async ({ page }) => {
    await page.goto('/en/rfq');
    await page.waitForSelector('form', { timeout: 5000 });

    // Submit empty form to trigger validation
    const submitButton = page.getByRole('button', { name: /submit/i });
    await submitButton.click();

    // Wait for validation messages
    await page.waitForTimeout(1000);

    const form = page.locator('form');
    await expect(form).toHaveScreenshot('rfq-form-validation-errors.png', {
      maxDiffPixels: 100,
    });
  });

  test('RFQ form filled state', async ({ page }) => {
    await page.goto('/en/rfq');
    await page.waitForSelector('form', { timeout: 5000 });

    // Fill form
    await page.getByLabel(/name/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('john@example.com');
    await page.getByLabel(/phone/i).fill('+1234567890');

    const form = page.locator('form');
    await expect(form).toHaveScreenshot('rfq-form-filled.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Visual Regression - Navigation', () => {
  test('navigation menu open', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en');

    // Try to open mobile menu if it exists
    const menuButton = page.locator('button[aria-label*="menu" i], button[aria-label*="navigation" i]');
    if (await menuButton.count() > 0) {
      await menuButton.click();
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot('navigation-menu-open.png', {
        maxDiffPixels: 100,
      });
    }
  });

  test('language switcher visible', async ({ page }) => {
    await page.goto('/en');

    // Screenshot of language switcher area
    const languageSwitcher = page.locator('text=العربية').locator('..');
    await expect(languageSwitcher).toHaveScreenshot('language-switcher.png', {
      maxDiffPixels: 50,
    });
  });
});

test.describe('Visual Regression - Pages', () => {
  const pages = [
    { path: '/en/about', name: 'about' },
    { path: '/en/services', name: 'services' },
    { path: '/en/products', name: 'products' },
    { path: '/en/capabilities', name: 'capabilities' },
    { path: '/en/contact', name: 'contact' },
  ];

  for (const { path, name } of pages) {
    test(`${name} page desktop`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot(`${name}-page-desktop.png`, {
        fullPage: true,
        maxDiffPixels: 100,
      });
    });

    test(`${name} page mobile`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot(`${name}-page-mobile.png`, {
        fullPage: true,
        maxDiffPixels: 100,
      });
    });
  }
});

test.describe('Visual Regression - RTL Layout', () => {
  test('Arabic RTL layout - full page', async ({ page }) => {
    await page.goto('/ar');
    await page.waitForLoadState('networkidle');

    // Check HTML dir attribute
    const htmlDir = await page.locator('html').getAttribute('dir');
    expect(htmlDir).toBe('rtl');

    await expect(page).toHaveScreenshot('rtl-full-page.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('Arabic RTL navigation', async ({ page }) => {
    await page.goto('/ar');

    const nav = page.locator('nav');
    await expect(nav).toHaveScreenshot('rtl-navigation.png', {
      maxDiffPixels: 50,
    });
  });
});

test.describe('Visual Regression - UI Components', () => {
  test('WhatsApp button visible', async ({ page }) => {
    await page.goto('/en');
    await page.waitForSelector('[href*="wa.me"]', { timeout: 5000 });

    const whatsappButton = page.locator('[href*="wa.me"]');
    await expect(whatsappButton).toHaveScreenshot('whatsapp-button.png', {
      maxDiffPixels: 50,
    });
  });

  test('footer section', async ({ page }) => {
    await page.goto('/en');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const footer = page.locator('footer');
    await expect(footer).toHaveScreenshot('footer-section.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Visual Regression - Responsive Breakpoints', () => {
  const breakpoints = [
    { name: 'mobile-sm', width: 320, height: 568 },
    { name: 'mobile-md', width: 375, height: 667 },
    { name: 'mobile-lg', width: 414, height: 896 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop-sm', width: 1024, height: 768 },
    { name: 'desktop-md', width: 1280, height: 720 },
    { name: 'desktop-lg', width: 1920, height: 1080 },
  ];

  for (const { name, width, height } of breakpoints) {
    test(`homepage at ${name} (${width}x${height})`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/en');
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot(`homepage-${name}.png`, {
        fullPage: false, // Viewport only for responsive tests
        maxDiffPixels: 100,
      });
    });
  }
});
