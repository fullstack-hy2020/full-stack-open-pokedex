import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5001',
    supportFile: false,
    specPattern: 'test/cypress/integration/**/*.spec.js',
    video: false,
    viewportWidth: 1280,
    viewportHeight: 720,
  }
})
