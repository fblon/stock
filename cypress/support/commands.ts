/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

function getSpinner(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.get('.spinner-border');
}

Cypress.Commands.add('checkEmptyStockTrackerPage', () => {
  const stockInputSelector = Cypress.env('stockInputSelector');
  const trackButtonSelector = Cypress.env('trackButtonSelector');

  cy.url().should('eq', Cypress.config().baseUrl);
  cy.get(stockInputSelector).should('exist');
  cy.get(trackButtonSelector).should('exist');
  getSpinner().should('not.exist');
});

Cypress.Commands.add('checkSentimentPage', (symbol: string) => {
  const sentimentBackBtnSelector = Cypress.env('sentimentBackBtnSelector');

  cy.url().should('include', `/sentiment/${symbol}`);
  cy.get(sentimentBackBtnSelector).should('exist');
  getSpinner().should('not.exist');
});

Cypress.Commands.add('checkGoToSentimentPage', (symbol: string) => {
  const gotToSentimentSelector = `#sentiment${symbol}`;
  const removeSentimentSelector = `#remove${symbol}`;

  cy.get(gotToSentimentSelector).should('exist');
  cy.get(removeSentimentSelector).should('exist');
});

Cypress.Commands.add('check404Page', () => {
  cy.url().should('include', '/404');
  getSpinner().should('not.exist');
});

Cypress.Commands.add('checkSpinner', () => {
  getSpinner().should('exist');
});
