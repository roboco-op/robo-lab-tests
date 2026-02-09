import { defineConfig, devices } from '@playwright/test';
import{PlaywrightTestConfig} from '@playwright/test';
export const baseURL = process.env.REEARTH_CMS_E2E_BASEURL || "https://cms.test.reearth.dev/";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL : "https://reearth-oss-test.eu.auth0.com/login?state=hKFo2SBQcWR3SHp0RUxuR3hHUzZBNFZ3d0Y0VkdkOHNGWDFGQqFupWxvZ2luo3RpZNkgVzFjY0xidVhOMEVCZ1Uwd1hJSVlDYmllOWFTM3A0aEyjY2lk2SBYcE9Obm1QTHNzMVBVNWNaQjlueDZwY2JQQThxTDRhdw&client=XpONnmPLss1PU5cZB9nx6pcbPA8qL4aw&protocol=oauth2&audience=https%3A%2F%2Fapi.cms.test.reearth.dev&scope=openid%20profile%20email%20offline_access&redirect_uri=https%3A%2F%2Fcms.test.reearth.dev&response_type=code&response_mode=query&nonce=X0VBVU1GRTNLRW9ZaHRVZ05KaWhZWlAuM1E3MjJYc1lPNVVRdTdBQzJBSQ%3D%3D&code_challenge=hiLj8LSrjWk0-4ZeoI86Af2py0R5LiyJUuxOeZXNcR0&code_challenge_method=S256&auth0Client=eyJuYW1lIjoiYXV0aDAtcmVhY3QiLCJ2ZXJzaW9uIjoiMS4xMi4wIn0%3D",
    headless: false,
    screenshot: "on",
    video: "on",
    ...devices["Desktop Chrome"],
    viewport: { width: 1680, height: 1050 },
    // storageState: 'playwright/.auth/user.json',
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    actionTimeout: 30000,    // Action timeout
    navigationTimeout: 30000, // Navigation timeout
  },

  /* Configure projects for major browsers */
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

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
  timeout: 120000, // Global timeout of 2 minutes
  expect: {
    timeout: 10000  // Expect assertion timeout
  },
  // ... other config options

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
