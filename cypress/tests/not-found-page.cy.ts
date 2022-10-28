/// <reference types="cypress" />

describe('Not Found Page', () => {

  it('when 404 url is provided should navigate to 404 page', () => {
    cy.visit('/404');

    cy.check404Page();
  });
});