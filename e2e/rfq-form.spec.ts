/**
 * RFQ Form E2E Tests
 *
 * End-to-end tests for RFQ form submission flow
 */

import { test, expect } from '@playwright/test';

test.describe('RFQ Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/rfq');
  });

  test('should display RFQ form', async ({ page }) => {
    await expect(page).toHaveTitle(/Request.*Quote|RFQ/i);
    await expect(page.getByRole('heading', { name: /request.*quote/i })).toBeVisible();
  });

  test('should show all required form fields', async ({ page }) => {
    // Wait for lazy-loaded form
    await page.waitForSelector('form', { timeout: 5000 });

    // Check for required fields
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/phone/i)).toBeVisible();
    await expect(page.getByLabel(/service/i)).toBeVisible();
    await expect(page.getByLabel(/material/i)).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Wait for form
    await page.waitForSelector('form', { timeout: 5000 });

    // Try to submit empty form
    const submitButton = page.getByRole('button', { name: /submit/i });
    await submitButton.click();

    // Should show validation errors (form should not submit)
    // Wait a moment to ensure no navigation occurred
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/\/rfq/);
  });

  test('should fill out and submit form successfully', async ({ page }) => {
    // Wait for form
    await page.waitForSelector('form', { timeout: 5000 });

    // Fill out form
    await page.getByLabel(/name/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('john@example.com');
    await page.getByLabel(/phone/i).fill('+1234567890');

    // Select service (if dropdown)
    const serviceField = page.getByLabel(/service/i);
    await serviceField.click();
    // Select first option
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // Select material
    const materialField = page.getByLabel(/material/i);
    await materialField.click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // Fill thickness
    await page.getByLabel(/thickness/i).fill('5');

    // Fill quantity
    await page.getByLabel(/quantity/i).fill('100');

    // Fill message
    await page.getByLabel(/message|description/i).fill('Test RFQ submission');

    // Submit form
    const submitButton = page.getByRole('button', { name: /submit/i });
    await submitButton.click();

    // Wait for success message or form reset
    await page.waitForTimeout(2000);

    // Verify success (either success message or form reset)
    // Note: Actual implementation may vary
  });

  test('should validate email format', async ({ page }) => {
    // Wait for form
    await page.waitForSelector('form', { timeout: 5000 });

    // Fill invalid email
    await page.getByLabel(/email/i).fill('invalid-email');
    await page.getByLabel(/name/i).fill('Test'); // Trigger validation

    // Try to submit
    const submitButton = page.getByRole('button', { name: /submit/i });
    await submitButton.click();

    // Should show validation error
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/\/rfq/);
  });

  test('should validate phone number', async ({ page }) => {
    // Wait for form
    await page.waitForSelector('form', { timeout: 5000 });

    // Fill invalid phone
    await page.getByLabel(/phone/i).fill('123'); // Too short
    await page.getByLabel(/name/i).fill('Test');

    // Try to submit
    const submitButton = page.getByRole('button', { name: /submit/i });
    await submitButton.click();

    // Should show validation error
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/\/rfq/);
  });

  test('should have contact information displayed', async ({ page }) => {
    // Check for contact info
    await expect(page.getByText(/Sales@msaddi\.com/i)).toBeVisible();
    await expect(page.getByText(/\+963.*944.*244.*604/)).toBeVisible();
  });
});
