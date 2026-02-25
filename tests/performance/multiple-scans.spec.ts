import { test, expect } from '../../src/fixtures/scanner.fixture';
import { TEST_URLS } from '../../src/utils/test-data';

test.describe('Performance - Multiple Scans', () => {
  /**
   * TC10 - Verify multiple consecutive scan operations
   */
  test('TC10 - Should handle multiple consecutive scans', async ({ scannerPage, page }) => {
    for (let i = 0; i < TEST_URLS.multiple.length; i++) {
      const url = TEST_URLS.multiple[i];

      let inputReady = false;
      for (let retry = 0; retry < 2; retry++) {
        if (await scannerPage.urlInput.isVisible() && await scannerPage.urlInput.isEnabled()) {
          inputReady = true;
          break;
        }
        await page.reload();
        await page.waitForLoadState('networkidle');
      }
      if (!inputReady) throw new Error(`URL input not available for scan ${i + 1}`);

      await scannerPage.urlInput.clear();
      await scannerPage.fillUrl(url);
      await scannerPage.startScan();

      await page.waitForTimeout(2000);
      await expect(scannerPage.scanButton).toBeEnabled({ timeout: 10000 });

      console.log(`Scan ${i + 1}/${TEST_URLS.multiple.length} completed: ${url}`);
    }

    await scannerPage.takeScreenshot('TC10-multiple-scans');

    const metrics = await page.evaluate(() => ({
      navigation: performance.getEntriesByType ? performance.getEntriesByType('navigation') : [],
      entries: performance.getEntries ? performance.getEntries() : [],
    }));
    console.log('Performance Metrics:', metrics);
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
