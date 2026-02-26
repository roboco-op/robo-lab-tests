import { test, expect } from '../../src/fixtures/scanner.fixture';

test.describe('Homepage - Smoke', () => {
  test('TC01 - Should load homepage with correct title and main elements', async ({ scannerPage, page }) => {
    await expect(page).toHaveTitle(/Robo-Lab|Web Scanner|Scanner/i);

    const mainContent = page.locator('main, [role="main"], .container, #root');
    await expect(mainContent.first()).toBeVisible();

    await scannerPage.takeScreenshot('TC01-homepage');
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
