import { defineConfig } from "cypress";
import { environment } from "src/environments/environment";

export default defineConfig({
  env: {
    stockInputSelector: '#stockInput',
    trackButtonSelector: '#trackBtn',
    sentimentBackBtnSelector: '#backBtn',
    finnhubBaseUrl: environment.finnhubBaseUrl
  },
  e2e: {
    baseUrl: 'http://localhost:4200/',
    specPattern: "cypress/tests/**/*.cy.ts",
    requestTimeout: 15000, // first test is slow in run mode, don't know why :(
    setupNodeEvents(on, config) {
      if (config.isTextTerminal) {
        // skip the all.cy.js spec in "cypress run" mode
        return {
          excludeSpecPattern: ['cypress/tests/all.cy.ts'],
        }
      }
    },    
  },
});
