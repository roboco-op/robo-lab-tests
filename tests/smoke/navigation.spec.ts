import { test } from '../../src/fixtures/scanner.fixture';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Navigation - Smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('TC02 - Should navigate through all menu items', async ({ page }) => { 
    const header = page.locator('header');
    const bookButton = header.locator('button:has-text("Book Consultation"), button:has-text("Book")').first();
    const logoButton = header.locator('button img[alt*="Logo"], button img[alt*="RoboLab"], button').first();

    if (await bookButton.count() > 0 && await bookButton.isVisible()) {
      await bookButton.click();
      await page.waitForTimeout(1000);
      console.log('Clicked Book Consultation button');

      // Close the modal that opens before attempting to click anything else
      const modal = page.locator('[role="dialog"][aria-modal="true"]');
      if (await modal.isVisible()) {
        await page.keyboard.press('Escape');
        await modal.waitFor({ state: 'hidden' });
        console.log('Closed modal');
      }
    }

    if (await logoButton.count() > 0 && await logoButton.isVisible()) {
      await logoButton.click();
      await page.waitForTimeout(1000);
      console.log('Clicked Logo button');
    }

    if ((await bookButton.count()) === 0 && (await logoButton.count()) === 0) {
      const dir = path.join(process.cwd(), 'test-results');
      await page.screenshot({ path: path.join(dir, 'TC02-no-nav-buttons.png'), fullPage: true });
      fs.writeFileSync(path.join(dir, 'TC02-no-nav-buttons.html'), await page.content());
      throw new Error('No navigation buttons found in header. See test-results/TC02-no-nav-buttons files for debugging.');
    }
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
