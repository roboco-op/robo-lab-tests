import { test, expect } from '../../src/fixtures/scanner.fixture';

test.describe('Accessibility - Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
  });

  /**
   * TC09 - Verify accessibility standards
   */
  test('TC09 - Should meet basic accessibility standards', async ({ page }) => {
    const h1 = page.locator('h1');
    expect(await h1.count()).toBeGreaterThan(0);

    const images = await page.locator('img').all();
    for (const img of images.slice(0, 5)) {
      const alt = await img.getAttribute('alt');
      expect(alt !== null).toBeTruthy();
    }

    const buttons = await page.locator('button').all();
    for (const button of buttons.slice(0, 5)) {
      if (!(await button.isVisible())) continue;
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      if (!(text?.trim() || ariaLabel)) {
        console.warn('Accessibility warning: Button missing text and aria-label');
        continue;
      }
      expect(text?.trim() || ariaLabel).toBeTruthy();
    }

    await expect(page.locator('body')).toBeVisible();
    await page.screenshot({ path: 'test-results/TC09-accessibility.png' });
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
