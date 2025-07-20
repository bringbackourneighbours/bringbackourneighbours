import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './' /* Run tests in files in parallel */,
  fullyParallel: true /* Fail the build on CI if you accidentally left test.only in the source code. */,
  forbidOnly: !!process.env.CI /* Retry on CI only */,
  retries: process.env.CI ? 2 : 0 /* Opt out of parallel tests on CI. */,
  workers: process.env.CI
    ? 1
    : undefined /* Reporter to use. See https://playwright.dev/docs/test-reporters */,
  reporter:
    'html' /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */,
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4321',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  testMatch: '**/*.spec.ts',

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    ...(process.env.CI
      ? [
          {
            name: 'Desktop Firefox',
            use: { ...devices['Desktop Firefox'] },
          },
          {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 7'] },
          },
          {
            name: 'Mobile Galaxy S24',
            use: { ...devices['Galaxy S24'] },
          },
        ]
      : []),
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
});
