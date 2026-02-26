import { Page } from '@playwright/test';
import * as nodePath from 'path';
import * as fs from 'fs';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(url = '/') {
    await this.page.goto(url, { waitUntil: 'load' });
  }

  async takeScreenshot(filename: string) {
    const dir = nodePath.join(process.cwd(), 'test-results');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    await this.page.screenshot({ path: nodePath.join(dir, `${filename}.png`), fullPage: true });
  }

  async saveDebugInfo(filename: string) {
    const dir = nodePath.join(process.cwd(), 'test-results');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    await this.page.screenshot({ path: nodePath.join(dir, `${filename}.png`), fullPage: true });
    const html = await this.page.content();
    fs.writeFileSync(nodePath.join(dir, `${filename}.html`), html);
  }
}
