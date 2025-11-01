/**
 * Navigation E2E Tests
 *
 * End-to-end tests for site navigation and multilingual support
 */

import { test, expect } from '@playwright/test';

test.describe('Site Navigation', () => {
  test('should navigate to About page', async ({ page }) => {
    await page.goto('/en');
    await page.click('text=/about/i');
    await page.waitForURL('**/about');
    await expect(page).toHaveURL(/\/about/);
  });

  test('should navigate to Services page', async ({ page }) => {
    await page.goto('/en');
    await page.click('text=/services/i');
    await page.waitForURL('**/services');
    await expect(page).toHaveURL(/\/services/);
  });

  test('should navigate to Products page', async ({ page }) => {
    await page.goto('/en');
    await page.click('text=/products/i');
    await page.waitForURL('**/products');
    await expect(page).toHaveURL(/\/products/);
  });

  test('should navigate to Capabilities page', async ({ page }) => {
    await page.goto('/en');
    await page.click('text=/capabilities/i');
    await page.waitForURL('**/capabilities');
    await expect(page).toHaveURL(/\/capabilities/);
  });

  test('should navigate to Contact page', async ({ page }) => {
    await page.goto('/en');
    await page.click('text=/contact/i');
    await page.waitForURL('**/contact');
    await expect(page).toHaveURL(/\/contact/);
  });

  test('should maintain locale when navigating', async ({ page }) => {
    // Start in Arabic
    await page.goto('/ar');

    // Navigate to About
    await page.click('text=/عن|about/i');
    await page.waitForURL('**/ar/about');

    // Should still be in Arabic
    await expect(page).toHaveURL(/\/ar\/about/);
  });

  test('should navigate back to home from any page', async ({ page }) => {
    // Go to Services
    await page.goto('/en/services');

    // Click home link
    await page.click('text=/home|MSADDI/i');

    // Should be on homepage
    await expect(page).toHaveURL(/\/en\/?$/);
  });
});

test.describe('Multilingual Support', () => {
  test('should access all active locales', async ({ page }) => {
    // English
    await page.goto('/en');
    await expect(page).toHaveURL(/\/en/);

    // Arabic
    await page.goto('/ar');
    await expect(page).toHaveURL(/\/ar/);

    // Turkish
    await page.goto('/tr');
    await expect(page).toHaveURL(/\/tr/);
  });

  test('should access hidden locales via URL', async ({ page }) => {
    // French
    await page.goto('/fr');
    await expect(page).toHaveURL(/\/fr/);

    // German
    await page.goto('/de');
    await expect(page).toHaveURL(/\/de/);

    // Dutch
    await page.goto('/nl');
    await expect(page).toHaveURL(/\/nl/);

    // Chinese
    await page.goto('/zh');
    await expect(page).toHaveURL(/\/zh/);

    // Russian
    await page.goto('/ru');
    await expect(page).toHaveURL(/\/ru/);
  });

  test('should preserve language during navigation', async ({ page }) => {
    await page.goto('/ar');

    // Navigate to multiple pages
    await page.click('text=/عن/i');
    await expect(page).toHaveURL(/\/ar\/about/);

    await page.click('text=/خدمات|services/i');
    await expect(page).toHaveURL(/\/ar\/services/);
  });

  test('should display Arabic in RTL', async ({ page }) => {
    await page.goto('/ar');

    // Check HTML dir attribute
    const htmlDir = await page.locator('html').getAttribute('dir');
    expect(htmlDir).toBe('rtl');
  });

  test('should display other languages in LTR', async ({ page }) => {
    await page.goto('/en');

    // Check HTML dir attribute
    const htmlDir = await page.locator('html').getAttribute('dir');
    expect(htmlDir).toBe('ltr');
  });

  test('should switch between all active languages', async ({ page }) => {
    await page.goto('/en');

    // Switch to Arabic
    await page.click('text=العربية');
    await page.waitForURL('**/ar');
    await expect(page).toHaveURL(/\/ar/);

    // Switch to Turkish
    await page.click('text=Türkçe');
    await page.waitForURL('**/tr');
    await expect(page).toHaveURL(/\/tr/);

    // Switch back to English
    await page.click('text=English');
    await page.waitForURL('**/en');
    await expect(page).toHaveURL(/\/en/);
  });

  test('should not show hidden locales in language switcher', async ({ page }) => {
    await page.goto('/en');

    // Hidden locales should not appear
    await expect(page.getByText('Français')).not.toBeVisible();
    await expect(page.getByText('Deutsch')).not.toBeVisible();
    await expect(page.getByText('Nederlands')).not.toBeVisible();
    await expect(page.getByText('中文')).not.toBeVisible();
    await expect(page.getByText('Русский')).not.toBeVisible();
  });
});

test.describe('Breadcrumbs & Navigation', () => {
  test('should display breadcrumbs on RFQ page', async ({ page }) => {
    await page.goto('/en/rfq');

    // Check for breadcrumb navigation
    await expect(page.getByRole('navigation').getByText(/home/i)).toBeVisible();
  });

  test('should navigate via breadcrumbs', async ({ page }) => {
    await page.goto('/en/rfq');

    // Click home in breadcrumbs
    await page.getByRole('navigation').getByText(/home/i).click();

    // Should navigate to home
    await expect(page).toHaveURL(/\/en\/?$/);
  });
});

test.describe('External Links', () => {
  test('should have WhatsApp link', async ({ page }) => {
    await page.goto('/en');

    // Wait for lazy-loaded WhatsApp button
    await page.waitForSelector('[href*="wa.me"]', { timeout: 5000 });

    const whatsappLink = page.locator('[href*="wa.me"]');
    const href = await whatsappLink.getAttribute('href');

    expect(href).toContain('wa.me');
    expect(href).toContain('+963944244604');
  });

  test('should have clickable phone number', async ({ page }) => {
    await page.goto('/en/contact');

    const phoneLink = page.locator('a[href^="tel:"]');
    await expect(phoneLink).toBeVisible();
  });

  test('should have clickable email address', async ({ page }) => {
    await page.goto('/en/contact');

    const emailLink = page.locator('a[href^="mailto:"]');
    await expect(emailLink).toBeVisible();
  });
});
