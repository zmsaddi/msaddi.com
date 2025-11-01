/**
 * Homepage E2E Tests
 *
 * End-to-end tests for homepage functionality
 */

import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/en');
    await expect(page).toHaveTitle(/MSADDI/);
  });

  test('should display navigation menu', async ({ page }) => {
    await page.goto('/en');

    // Check for navigation links
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /services/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /products/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /contact/i })).toBeVisible();
  });

  test('should display language switcher', async ({ page }) => {
    await page.goto('/en');

    // Language switcher should be visible
    const languageSwitcher = page.locator('text=العربية');
    await expect(languageSwitcher).toBeVisible();
  });

  test('should switch language to Arabic', async ({ page }) => {
    await page.goto('/en');

    // Click Arabic language button
    await page.click('text=العربية');

    // Wait for navigation
    await page.waitForURL('**/ar');

    // Verify Arabic content loaded
    await expect(page).toHaveURL(/\/ar/);
  });

  test('should switch language to Turkish', async ({ page }) => {
    await page.goto('/en');

    // Click Turkish language button
    await page.click('text=Türkçe');

    // Wait for navigation
    await page.waitForURL('**/tr');

    // Verify Turkish content loaded
    await expect(page).toHaveURL(/\/tr/);
  });

  test('should have WhatsApp button', async ({ page }) => {
    await page.goto('/en');

    // Wait for lazy-loaded WhatsApp button
    await page.waitForSelector('[href*="wa.me"]', { timeout: 5000 });

    const whatsappButton = page.locator('[href*="wa.me"]');
    await expect(whatsappButton).toBeVisible();
  });

  test('should navigate to RFQ page', async ({ page }) => {
    await page.goto('/en');

    // Click RFQ link
    await page.click('text=/Request.*Quote|RFQ/i');

    // Wait for navigation
    await page.waitForURL('**/rfq');

    // Verify RFQ page loaded
    await expect(page).toHaveURL(/\/rfq/);
  });

  test('should display footer', async ({ page }) => {
    await page.goto('/en');

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check for footer content
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en');

    // Page should load without errors
    await expect(page).toHaveTitle(/MSADDI/);

    // Navigation should be visible (possibly in mobile menu)
    await expect(page.locator('nav')).toBeVisible();
  });
});
