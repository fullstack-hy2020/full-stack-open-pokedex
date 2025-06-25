const { defineConfig } = require('@playwright/test')

module.exports = defineConfig({
  webServer: {
    command: 'npm run serve',
    port: 5000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
})
