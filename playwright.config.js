import { defineConfig } from '@playwright/test'

export default defineConfig({
  webServer: {
    command: 'npm run start:prod',
    url: 'http://127.0.0.1:5000',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:5000/',
  },
  testDir: 'e2e-tests',
})