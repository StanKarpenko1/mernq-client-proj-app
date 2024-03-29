const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
    // baseUrl: 'http://localhost:3005',
  },
});
