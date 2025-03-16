// playwright.config.js
/*import { defineConfig } from '@playwright/test'

export default defineConfig({
    webServer: {
        command: 'npm start', // Change this if your app uses a different start command
        url: 'http://localhost:8080/',
        timeout: 120000,
        reuseExistingServer: true
    }
})*/


import { defineConfig } from '@playwright/test'

export default defineConfig({
    webServer: {
        command: 'npm run start', // Change this to the actual command that starts your app
        url: 'http://localhost:8080', // Make sure this matches the URL in your test
        timeout: 120 * 1000, // Wait up to 2 minutes for the server to start
        // eslint-disable-next-line no-undef
        reuseExistingServer: !process.env.CI, // Prevents re-starting locally
    },
    use: {
        headless: true, // Run tests in headless mode
    },
})
