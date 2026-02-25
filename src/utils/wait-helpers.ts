import { Page } from '@playwright/test';

export async function waitForNetworkIdle(page: Page) {
  await page.waitForLoadState('networkidle');
}

export async function waitForScanCompletion(page: Page, timeout = 30000) {
  const reportSection = page.locator('text=Get Your Full Report, text=Full Report, text=Send Report').first();
  await reportSection.waitFor({ state: 'visible', timeout });
}

export async function waitForElementOrReload(page: Page, selector: string, maxRetries = 2) {
  for (let i = 0; i <= maxRetries; i++) {
    const el = page.locator(selector).first();
    if (await el.isVisible() && await el.isEnabled()) return el;
    if (i < maxRetries) {
      await page.reload();
      await page.waitForLoadState('networkidle');
    }
  }
  throw new Error(`Element "${selector}" not available after ${maxRetries} retries`);
}
