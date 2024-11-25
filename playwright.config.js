import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: 'e2e-tests',
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:8080',
    timeout: 120 * 1000,
    // eslint-disable-next-line no-undef
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:8080/',
  },
})