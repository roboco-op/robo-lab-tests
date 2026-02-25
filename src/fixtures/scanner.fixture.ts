import { test as base } from '@playwright/test';
import { ScannerPage } from '../pages/scanner.page';
import { ConsultationPage } from '../pages/consultation.page';

type RoboLabFixtures = {
  scannerPage: ScannerPage;
  consultationPage: ConsultationPage;
};

export const test = base.extend<RoboLabFixtures>({
  scannerPage: async ({ page }, use) => {
    const scannerPage = new ScannerPage(page);
    await scannerPage.goto('/');
    await use(scannerPage);
  },

  consultationPage: async ({ page }, use) => {
    const consultationPage = new ConsultationPage(page);
    await consultationPage.goto('/');
    await use(consultationPage);
  },
});

export { expect } from '@playwright/test';
