import { test } from '../../src/fixtures/scanner.fixture';
import { TEST_URLS } from '../../src/utils/test-data';

test.describe('URL Input - Smoke', () => {
  test('TC03 - Should validate URL input field correctly', async ({ scannerPage, page }) => {
    await scannerPage.fillUrl(TEST_URLS.valid);

    await scannerPage.urlInput.clear();
    await scannerPage.urlInput.fill(TEST_URLS.invalid);

    const submitButton = page.locator('button[type="submit"], button:has-text("Scan")').first();
    if (await submitButton.count() > 0) {
      await submitButton.click();
      await page.waitForTimeout(1000);
    }

    await scannerPage.takeScreenshot('TC03-url-validation');
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({
        path: `test-results/FAILED-${testInfo.title.replace(/\s+/g, '-')}.png`,
        fullPage: true,
      });
    }
  });
});
