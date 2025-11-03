const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5000',
    specPattern: 'test/e2e/cypress/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
  },
})
