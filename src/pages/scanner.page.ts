import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ScannerPage extends BasePage {
  readonly urlInput: Locator;
  readonly scanButton: Locator;
  readonly emailInput: Locator;
  readonly sendReportButton: Locator;
  readonly clearButton: Locator;

  constructor(page: Page) {
    super(page);
    this.urlInput = page.locator('input[type="url"], input[placeholder*="URL"], input[type="text"]').first();
    this.scanButton = page.locator('button[type="submit"], button:has-text("Scan"), button:has-text("Start")').first();
    this.emailInput = page.locator('input[type="email"]').last();
    this.sendReportButton = page.locator('button:has-text("Send Full Report"), button:has-text("Send Report")').first();
    this.clearButton = page.locator('button:has-text("Clear"), button:has-text("Reset"), button[type="reset"], .clear-btn').first();
  }

  async fillUrl(url: string) {
    await this.urlInput.fill(url);
    await expect(this.urlInput).toHaveValue(url);
  }

  async startScan() {
    await expect(this.scanButton).toBeEnabled();
    await this.scanButton.click();
  }

  async waitForReportSection(timeout = 30000) {
    const reportSection = this.page.locator(':text("Get Your Full Report"), :text("Full Report"), :text("Send Report")').first();
    await reportSection.waitFor({ state: 'visible', timeout });
  }

  async fillReportEmail(email: string) {
    await expect(this.emailInput).toBeVisible();
    await this.emailInput.fill(email);
  }

  async sendReport() {
    await expect(this.sendReportButton).toBeEnabled();
    await this.sendReportButton.click();
  }

  async clearForm() {
    if (await this.clearButton.count() > 0 && await this.clearButton.isVisible()) {
      await this.clearButton.click();
    } else {
      await this.urlInput.clear();
    }
  }
}
