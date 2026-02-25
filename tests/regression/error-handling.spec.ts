import { test, expect } from '../../src/fixtures/scanner.fixture';

test.describe('Error Handling - Regression', () => {
  /**
   * TC07 - Verify form clear/reset functionality
   */
  test('TC07 - Should clear form when clear/reset button is clicked', async ({ scannerPage }) => {
    await scannerPage.fillUrl('https://test-example.com');
    await expect(scannerPage.urlInput).toHaveValue('https://test-example.com');

    await scannerPage.clearForm();
    await expect(scannerPage.urlInput).toHaveValue('');

    await scannerPage.takeScreenshot('TC07-form-cleared');
  });

  /**
   * TC08 - Verify error handling for network issues
   */
  test('TC08 - Should handle network errors gracefully', async ({ scannerPage, page }) => {
    await page.context().setOffline(true);

    await scannerPage.fillUrl('https://example.com');
    await scannerPage.startScan();
    await page.waitForTimeout(3000);

    await scannerPage.takeScreenshot('TC08-network-error');
    await page.context().setOffline(false);
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
