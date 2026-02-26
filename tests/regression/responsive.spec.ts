import { test, expect } from '../../src/fixtures/scanner.fixture';

test.describe('Responsive Design - Regression', () => {
  /**
   * TC06 - Verify responsive design on mobile
   */
  test('TC06 - Should display correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/', { waitUntil: 'load' });

    const mainContent = page.locator('main, #root, .container').first();
    await expect(mainContent).toBeVisible();

    const mobileMenu = page.locator('.hamburger, .mobile-menu, button[aria-label*="menu"], .navbar-toggler');
    if (await mobileMenu.count() > 0) {
      await expect(mobileMenu.first()).toBeVisible();
    }

    await page.screenshot({ path: 'test-results/TC06-mobile-view.png', fullPage: true });
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
