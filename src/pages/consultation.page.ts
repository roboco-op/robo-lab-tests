import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import type { ConsultationFormData } from '../types/scanner.types';

export class ConsultationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openBookingForm() {
    const selectors = [
      'button:has-text("Book Consultation")',
      'a:has-text("Book Consultation")',
      'button:has-text("Book a Consultation")',
      'button:has-text("Contact")',
      'a:has-text("Contact")',
      'button:has-text("Get Started")',
      'a[href*="consultation"]',
    ];

    for (const selector of selectors) {
      const button = this.page.locator(selector).first();
      if (await button.count() > 0 && await button.isVisible()) {
        await button.click();
        await this.page.waitForTimeout(1500);
        return;
      }
    }

    console.log('No booking button found — form may already be visible');
  }

  async fillForm(data: ConsultationFormData) {
    if (data.name) {
      for (const sel of ['input[name="name"]', 'input[placeholder*="Name"]', 'input[type="text"]']) {
        const input = this.page.locator(sel).first();
        if (await input.count() > 0 && await input.isVisible()) { await input.fill(data.name); break; }
      }
    }
    if (data.email) {
      for (const sel of ['input[type="email"]', 'input[name="email"]', 'input[placeholder*="Email"]']) {
        const input = this.page.locator(sel).first();
        if (await input.count() > 0 && await input.isVisible()) { await input.fill(data.email); break; }
      }
    }
    if (data.phone) {
      for (const sel of ['input[type="tel"]', 'input[name="phone"]', 'input[placeholder*="Phone"]']) {
        const input = this.page.locator(sel).first();
        if (await input.count() > 0 && await input.isVisible()) { await input.fill(data.phone); break; }
      }
    }
    if (data.company) {
      for (const sel of ['input[name="company"]', 'input[placeholder*="Company"]', 'input[placeholder*="Organization"]']) {
        const input = this.page.locator(sel).first();
        if (await input.count() > 0 && await input.isVisible()) { await input.fill(data.company); break; }
      }
    }
    if (data.website) {
      for (const sel of ['input[name="website"]', 'input[placeholder*="Website"]', 'input[placeholder*="URL"]']) {
        const input = this.page.locator(sel).first();
        if (await input.count() > 0 && await input.isVisible()) { await input.fill(data.website); break; }
      }
    }
    if (data.message) {
      for (const sel of ['textarea[name="message"]', 'textarea[placeholder*="Message"]', 'textarea']) {
        const input = this.page.locator(sel).first();
        if (await input.count() > 0 && await input.isVisible()) { await input.fill(data.message); break; }
      }
    }
  }

  async checkAllCheckboxes() {
    const checkboxes = await this.page.locator('input[type="checkbox"], [role="checkbox"]').all();
    for (const checkbox of checkboxes) {
      if (await checkbox.isVisible() && !(await checkbox.isChecked())) {
        await checkbox.check();
      }
    }
  }

  async submitForm() {
    const selectors = [
      'button[type="submit"]', 'button:has-text("Submit")', 'button:has-text("Book")',
      'button:has-text("Send")', 'button:has-text("Schedule")', 'input[type="submit"]',
    ];
    for (const selector of selectors) {
      const button = this.page.locator(selector).first();
      if (await button.count() > 0 && await button.isVisible()) {
        await button.click();
        await this.page.waitForTimeout(3000);
        return;
      }
    }
  }

  async closeForm() {
    const selectors = [
      'button:has-text("Cancel")', 'button:has-text("Close")',
      'button[aria-label="Close"]', '.close', '.modal-close', 'button.btn-close',
    ];
    for (const selector of selectors) {
      const button = this.page.locator(selector).first();
      if (await button.count() > 0 && await button.isVisible()) {
        await button.click();
        await this.page.waitForTimeout(1000);
        return;
      }
    }
  }

  async checkSuccessMessage(): Promise<boolean> {
    const selectors = [
      '.success', '.success-message', '[role="alert"]', '.alert-success',
      'text=success', 'text=Success', 'text=Thank you',
      'text=submitted', 'text=Submitted', 'text=received', 'text=Received',
    ];
    for (const selector of selectors) {
      const el = this.page.locator(selector);
      if (await el.count() > 0) {
        try {
          await el.first().waitFor({ state: 'visible', timeout: 5000 });
          return true;
        } catch { continue; }
      }
    }
    return false;
  }
}
