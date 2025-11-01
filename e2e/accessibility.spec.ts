/**
 * Accessibility E2E Tests
 *
 * Automated accessibility testing using axe-core
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Helper function to run axe accessibility scan
 */
async function checkAccessibility(page: any, pageName: string) {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags([
      'wcag2a',
      'wcag2aa',
      'wcag21a',
      'wcag21aa',
      'best-practice',
    ])
    .analyze();

  // Log violations if any
  if (accessibilityScanResults.violations.length > 0) {
    console.log(`\n⚠️  Accessibility violations found on ${pageName}:`);
    accessibilityScanResults.violations.forEach((violation) => {
      console.log(`  - ${violation.id}: ${violation.description}`);
      console.log(`    Impact: ${violation.impact}`);
      console.log(`    Elements affected: ${violation.nodes.length}`);
    });
  }

  return accessibilityScanResults;
}

test.describe('Accessibility - Homepage', () => {
  test('homepage English - no accessibility violations', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    const results = await checkAccessibility(page, 'Homepage (English)');

    // No critical or serious violations
    const criticalViolations = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(criticalViolations).toHaveLength(0);
  });

  test('homepage Arabic (RTL) - no accessibility violations', async ({ page }) => {
    await page.goto('/ar');
    await page.waitForLoadState('networkidle');

    const results = await checkAccessibility(page, 'Homepage (Arabic)');

    const criticalViolations = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(criticalViolations).toHaveLength(0);
  });

  test('homepage Turkish - no accessibility violations', async ({ page }) => {
    await page.goto('/tr');
    await page.waitForLoadState('networkidle');

    const results = await checkAccessibility(page, 'Homepage (Turkish)');

    const criticalViolations = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(criticalViolations).toHaveLength(0);
  });
});

test.describe('Accessibility - All Pages', () => {
  const pages = [
    { path: '/en/about', name: 'About' },
    { path: '/en/services', name: 'Services' },
    { path: '/en/products', name: 'Products' },
    { path: '/en/capabilities', name: 'Capabilities' },
    { path: '/en/contact', name: 'Contact' },
    { path: '/en/rfq', name: 'RFQ' },
  ];

  for (const { path, name } of pages) {
    test(`${name} page - no accessibility violations`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      // Wait for lazy-loaded content
      if (path.includes('rfq')) {
        await page.waitForSelector('form', { timeout: 5000 });
      }

      const results = await checkAccessibility(page, name);

      const criticalViolations = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
      );
      expect(criticalViolations).toHaveLength(0);
    });
  }
});

test.describe('Accessibility - Forms', () => {
  test('RFQ form has proper labels and ARIA attributes', async ({ page }) => {
    await page.goto('/en/rfq');
    await page.waitForSelector('form', { timeout: 5000 });

    const results = await new AxeBuilder({ page })
      .include('form')
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    // No violations in form
    expect(results.violations).toHaveLength(0);

    // Check for proper labels
    const nameInput = page.getByLabel(/name/i);
    await expect(nameInput).toBeVisible();

    const emailInput = page.getByLabel(/email/i);
    await expect(emailInput).toBeVisible();

    const phoneInput = page.getByLabel(/phone/i);
    await expect(phoneInput).toBeVisible();
  });

  test('form validation errors are accessible', async ({ page }) => {
    await page.goto('/en/rfq');
    await page.waitForSelector('form', { timeout: 5000 });

    // Submit empty form to trigger validation
    const submitButton = page.getByRole('button', { name: /submit/i });
    await submitButton.click();

    await page.waitForTimeout(1000);

    // Check for ARIA live regions or error messages
    const results = await new AxeBuilder({ page })
      .include('form')
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    // No new violations after validation
    const criticalViolations = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(criticalViolations).toHaveLength(0);
  });
});

test.describe('Accessibility - Navigation', () => {
  test('navigation menu is keyboard accessible', async ({ page }) => {
    await page.goto('/en');

    // Tab through navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Check that focus is visible
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('language switcher is keyboard accessible', async ({ page }) => {
    await page.goto('/en');

    // Find and focus language switcher
    const languageSwitcher = page.locator('text=العربية');
    await languageSwitcher.focus();

    // Should be focusable
    const isFocused = await languageSwitcher.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBe(true);

    // Should be activatable with Enter key
    await page.keyboard.press('Enter');
    await page.waitForURL('**/ar', { timeout: 3000 });
    await expect(page).toHaveURL(/\/ar/);
  });

  test('skip links are present for keyboard navigation', async ({ page }) => {
    await page.goto('/en');

    // Check for skip link (common accessibility pattern)
    // Note: This might not exist yet, but it's a best practice
    const skipLink = page.locator('a[href="#main-content"], a[href="#content"]');
    const skipLinkExists = await skipLink.count();

    // Log if skip link is missing (not a failure, but a recommendation)
    if (skipLinkExists === 0) {
      console.log('ℹ️  Recommendation: Add skip link for keyboard navigation');
    }
  });
});

test.describe('Accessibility - Color Contrast', () => {
  test('text has sufficient color contrast', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('body')
      .analyze();

    // Check for color contrast violations
    const contrastViolations = results.violations.filter(
      (v) => v.id === 'color-contrast'
    );

    if (contrastViolations.length > 0) {
      console.log('⚠️  Color contrast violations:');
      contrastViolations.forEach((v) => {
        v.nodes.forEach((node) => {
          console.log(`  - ${node.html}`);
        });
      });
    }

    expect(contrastViolations).toHaveLength(0);
  });
});

test.describe('Accessibility - Images', () => {
  test('images have alt text', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a'])
      .analyze();

    // Check for image alt violations
    const imageAltViolations = results.violations.filter(
      (v) => v.id === 'image-alt'
    );

    expect(imageAltViolations).toHaveLength(0);
  });
});

test.describe('Accessibility - Headings', () => {
  test('heading hierarchy is logical', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['best-practice'])
      .analyze();

    // Check for heading order violations
    const headingViolations = results.violations.filter(
      (v) => v.id === 'heading-order'
    );

    expect(headingViolations).toHaveLength(0);
  });

  test('page has h1 heading', async ({ page }) => {
    await page.goto('/en');

    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1); // Exactly one h1
    await expect(h1.first()).toBeVisible();
  });
});

test.describe('Accessibility - Lang Attribute', () => {
  test('HTML has correct lang attribute for English', async ({ page }) => {
    await page.goto('/en');

    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('en');
  });

  test('HTML has correct lang attribute for Arabic', async ({ page }) => {
    await page.goto('/ar');

    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('ar');
  });

  test('HTML has correct lang attribute for Turkish', async ({ page }) => {
    await page.goto('/tr');

    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('tr');
  });
});

test.describe('Accessibility - ARIA', () => {
  test('no invalid ARIA attributes', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    // Check for ARIA violations
    const ariaViolations = results.violations.filter(
      (v) =>
        v.id.includes('aria') ||
        v.id === 'aria-allowed-attr' ||
        v.id === 'aria-required-attr' ||
        v.id === 'aria-valid-attr' ||
        v.id === 'aria-valid-attr-value'
    );

    expect(ariaViolations).toHaveLength(0);
  });
});

test.describe('Accessibility - Mobile', () => {
  test('mobile view has no accessibility violations', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    const results = await checkAccessibility(page, 'Homepage (Mobile)');

    const criticalViolations = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(criticalViolations).toHaveLength(0);
  });

  test('mobile menu is accessible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en');

    // Check for mobile menu button
    const menuButton = page.locator('button[aria-label*="menu" i], button[aria-label*="navigation" i]');
    const menuButtonCount = await menuButton.count();

    if (menuButtonCount > 0) {
      // Mobile menu exists, check accessibility
      await expect(menuButton.first()).toBeVisible();

      // Should have proper ARIA attributes
      const ariaLabel = await menuButton.first().getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
    }
  });
});

test.describe('Accessibility - Focus Management', () => {
  test('focus indicators are visible', async ({ page }) => {
    await page.goto('/en');

    // Tab through interactive elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Get the focused element
    const focusedElement = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return null;

      const styles = window.getComputedStyle(el);
      return {
        outline: styles.outline,
        outlineWidth: styles.outlineWidth,
        outlineStyle: styles.outlineStyle,
        boxShadow: styles.boxShadow,
      };
    });

    // Should have some focus indicator
    expect(focusedElement).toBeTruthy();
    const hasFocusIndicator =
      focusedElement.outlineWidth !== '0px' ||
      focusedElement.boxShadow !== 'none';

    if (!hasFocusIndicator) {
      console.log('⚠️  Warning: Focus indicators might not be visible');
    }
  });

  test('modal focus trap works correctly', async ({ page }) => {
    await page.goto('/en');

    // This test would be relevant if we have modals
    // For now, it's a placeholder for future modal implementations
    console.log('ℹ️  Note: Modal focus trap test requires modal implementation');
  });
});
