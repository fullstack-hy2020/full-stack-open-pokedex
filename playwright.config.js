const { defineConfig } = require('@playwright/test')

module.exports = defineConfig({
  testDir: './e2e-tests',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:5000'
  },
  webServer: {
    command: 'npm run build && npm run start-prod',
    port: 5000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI
  }
})