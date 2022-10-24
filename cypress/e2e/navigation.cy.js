/// <reference types="cypress" />

describe('Navigation', () => {

  it ('when default url is provided should stay on the page', () => {
    cy.visit('/');
    
    cy.checkDefaultPage();
  });

  it ('when non existing url is provided should navigate to defaut url', () => {
    cy.visit('/test');
    
    cy.checkDefaultPage();
  });
});