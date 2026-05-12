const { defineConfig } = require('@playwright/test')

module.exports = defineConfig({
  testDir: './e2e-tests',

  use: {
    baseURL: 'http://localhost:5000',
  },

  webServer: {
    command: 'npm run start-prod',
    port: 5000,
  },
})