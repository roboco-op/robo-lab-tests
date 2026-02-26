import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : Number(process.env.RETRIES ?? 0),
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: process.env.BASE_URL,
    headless: process.env.HEADLESS === 'true',
    screenshot: 'on',
    video: 'on',
    ...devices['Desktop Chrome'],
    viewport: {
      width: Number(process.env.VIEWPORT_WIDTH ?? 1680),
      height: Number(process.env.VIEWPORT_HEIGHT ?? 1050),
    },
    trace: 'on-first-retry',
    actionTimeout: Number(process.env.ACTION_TIMEOUT ?? 30000),
    navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT ?? 30000),
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
