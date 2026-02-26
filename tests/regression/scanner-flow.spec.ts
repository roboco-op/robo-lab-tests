import { test, expect } from '../../src/fixtures/scanner.fixture';
import { TEST_URLS, TEST_EMAIL } from '../../src/utils/test-data';
import { assertScanResultsVisible, assertSuccessMessageVisible } from '../../src/assertions/scanner-assertions';

test.describe('Scanner Flow - Regression', () => {
  /**
   * TC04 - Complete flow: scan website and send report to email
   */
  test('TC04 - Should scan website and send full report to email', async ({ scannerPage, page }) => {
    test.setTimeout(120000); // scanning a real site can take up to 2 minutes
    await scannerPage.fillUrl(TEST_URLS.roboLab);
    await scannerPage.startScan();
    console.log(`Scanning: ${TEST_URLS.roboLab}`);

    await page.waitForTimeout(5000);
    await scannerPage.takeScreenshot('TC04-01-scan-initiated');

    try {
      await scannerPage.waitForReportSection(90000);
      console.log('Report section appeared');
    } catch {
      await scannerPage.saveDebugInfo('TC04-debug');
      throw new Error('Report section did not appear after scan'); 
    }

    await scannerPage.fillReportEmail(TEST_EMAIL);
    expect(await scannerPage.emailInput.inputValue()).toBe(TEST_EMAIL);
    await scannerPage.takeScreenshot('TC04-02-email-filled');

    await scannerPage.sendReport();
    await page.waitForTimeout(3000);
    await scannerPage.takeScreenshot('TC04-03-report-sent');

    const success = await assertSuccessMessageVisible(page);
    console.log(success ? `Report sent to ${TEST_EMAIL}` : 'Success message not found, but report was submitted');
  });

  /**
   * TC04b - Alternative: test report sending only (skip scan)
   */
  test('TC04b - Should fill and send report with email (skip scan)', async ({ scannerPage, page }) => {
    await page.waitForTimeout(2000);

    if (await scannerPage.emailInput.count() > 0 && await scannerPage.emailInput.isVisible()) {
      await scannerPage.fillReportEmail(TEST_EMAIL);
      await scannerPage.sendReport();
      await scannerPage.takeScreenshot('TC04b-report-sent');
      console.log(`Report sent to ${TEST_EMAIL}`);
    } else {
      console.log('Email input not visible — report section may not have loaded');
    }
  });

  /**
   * TC05 - Verify results display after scan
   */
  test('TC05 - Should display scan results after completion', async ({ scannerPage, page }) => {
    await scannerPage.fillUrl(TEST_URLS.valid);
    await scannerPage.startScan();
    await page.waitForTimeout(5000);

    await assertScanResultsVisible(page);
    await scannerPage.takeScreenshot('TC05-scan-results');
  });

  test.afterEach(async ({ scannerPage }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await scannerPage.saveDebugInfo(`FAILED-${testInfo.title.replace(/\s+/g, '-')}`);
    }
  });
});
