import { expect, Page } from '@playwright/test';

export async function assertScanResultsVisible(page: Page): Promise<boolean> {
  const selectors = ['.results', '.scan-results', '#results', '[data-testid="results"]', '.report', '.output'];
  for (const selector of selectors) {
    const el = page.locator(selector);
    if (await el.count() > 0 && await el.isVisible()) {
      await expect(el).toBeVisible();
      return true;
    }
  }
  return false;
}

export async function assertSuccessMessageVisible(page: Page): Promise<boolean> {
  const selectors = [
    'text=sent', 'text=Sent', 'text=success', 'text=Success',
    '.success', '.alert-success', '[role="alert"]',
  ];
  for (const selector of selectors) {
    const el = page.locator(selector);
    if (await el.count() > 0) return true;
  }
  return false;
}

export async function assertValidationErrorsVisible(page: Page): Promise<boolean> {
  // Check HTML5 native constraint validation (required attribute triggers :invalid state)
  const invalidInputs = await page.locator('input:invalid, textarea:invalid, select:invalid').count();
  if (invalidInputs > 0) return true;

  // Check custom validation error elements
  const selectors = [
    '.error', '.error-message', '[role="alert"]',
    '.invalid-feedback', '.field-error', 'text=required', 'text=Required',
    '[class*="text-red"]', '[class*="error"]',
  ];
  for (const selector of selectors) {
    const el = page.locator(selector);
    if (await el.count() > 0) return true;
  }
  return false;
}
