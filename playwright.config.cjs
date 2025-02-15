import { defineConfig } from '@playwright/test';

module.exports = defineConfig({
  testDir: './test/playwright',
  timeout: 30000,
  retries: 1,
  reporter: [['html', { outputFolder: 'playwright-report' }]],

  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    baseURL: 'http://localhost:5001',
  },

  webServer: {
    command: 'npm start',
    port: 5001,
    timeout: 120 * 1000,
    reuseExistingServer: true,
  },
})