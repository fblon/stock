/// <reference types="cypress" />

import { goToSentimentSelector, removeSentimentSelector } from './utils';

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
const stockInputSelector = Cypress.env('stockInputSelector');
const trackButtonSelector = Cypress.env('trackButtonSelector');
const sentimentBackBtnSelector = Cypress.env('sentimentBackBtnSelector');

Cypress.Commands.add('getSpinner', () => cy.get('.spinner-border'));
Cypress.Commands.add('getStockInput', () => cy.get(stockInputSelector));
Cypress.Commands.add('getTrackButton', () => cy.get(trackButtonSelector));
Cypress.Commands.add('getSentimentBackBtn', () => cy.get(sentimentBackBtnSelector));
Cypress.Commands.add('getGoToSentiment', (symbol: string) => cy.get(goToSentimentSelector(symbol)));
Cypress.Commands.add('getRemoveSentiment', (symbol: string) => cy.get(removeSentimentSelector(symbol)));

Cypress.Commands.add('checkEmptyStockTrackerPage', () => {
  cy.url().should('eq', Cypress.config().baseUrl);
  cy.getStockInput().should('exist');
  cy.getTrackButton().should('exist');
  cy.getSpinner().should('not.exist');
});

Cypress.Commands.add('checkSentimentPage', (symbol: string) => {

  cy.url().should('include', `/sentiment/${symbol}`);
  cy.getSentimentBackBtn().should('exist');
  cy.getSpinner().should('not.exist');
});

Cypress.Commands.add('checkGoToSentimentPage', (symbol: string) => {

  cy.getGoToSentiment(symbol).should('exist');
  cy.getRemoveSentiment(symbol).should('exist');
});

Cypress.Commands.add('check404Page', () => {
  cy.url().should('include', '/404');
  cy.getSpinner().should('not.exist');
});

Cypress.Commands.add('checkSpinner', () => {
  cy.getSpinner().should('exist');
});
