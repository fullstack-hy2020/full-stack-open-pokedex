import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './test/e2e-tests',
  timeout: 30000,
  retries: 0,
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:8080',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    headless: true,
    baseURL: 'http://localhost:8080/',
  },
})
