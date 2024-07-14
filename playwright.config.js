// playwright.config.js
const { defineConfig } = require('@playwright/test')

module.exports = defineConfig({
  testDir: './e2e-tests', // Specify the directory containing your end-to-end tests
  timeout: 30000,         // Maximum time one test can run in milliseconds
  retries: 2,             // Number of retries for failed tests
  use: {
    headless: true,       // Run tests in headless mode
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  webServer: {
    command: 'npm run start',
    port: 8080,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  reporter: [['list'], ['html', { open: 'never' }]]
})
