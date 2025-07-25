import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
// import path from 'path';
dotenv.config({
  path: process.env.ENV_NAME
    ? `./env-files/.env.${process.env.ENV_NAME}`
    : `./env-files/.env.demo`,
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [['html'], ['playwright-ctrf-json-reporter', {}]]
    : [['html', { open: 'always' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      use: { baseURL: process.env.BASE_URL },
    },

    // Web tests project
    {
      name: 'ui_test_chrome',
      testDir: './tests/ui-tests/',
      testMatch: /.*\.spec\.ts/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL,
        storageState: './.auth/auth.json',
      },
    },

    {
      name: 'ui_test_firefox',
      testDir: './tests/ui-tests/',
      testMatch: /.*\.spec\.ts/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Firefox'],
        baseURL: process.env.BASE_URL,
        storageState: './.auth/auth.json',
      },
    },
    // API tests project
    {
      name: 'api_test',
      testDir: './tests/api-tests/',
      testMatch: /.*\.spec\.ts/,
      use: {
        baseURL: process.env.API_BASE_URL,
        extraHTTPHeaders: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    },

    // {
    //   name: 'chromium',
    //   dependencies: ['setup'],
    //   use: { ...devices['Desktop Chrome'], storageState: './.auth/auth.json' },
    // },

    // {
    //   name: 'firefox',
    //   dependencies:['setup'],
    //   use: { ...devices['Desktop Firefox'], storageState: './.auth/auth.json'},
    // },

    // {
    //   name: 'webkit',
    //   dependencies:['setup'],
    //   use: { ...devices['Desktop Safari'] , storageState: './.auth/auth.json'},
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

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
