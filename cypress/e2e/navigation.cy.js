/// <reference types="cypress" />

describe('Navigation', () => {

  it('when default url is provided should remain on default page', () => {
    cy.visit('/');

    cy.checkDefaultPage();
  });

  it('when non existing url is provided should navigate to defaut page', () => {
    cy.visit('/test');

    cy.checkDefaultPage();
  });

  it('when sentiment url WITHOUT a symbol is provided should navigate to default', () => {
    cy.visit(`/sentiment`);

    cy.checkDefaultPage();
  });

  it('when sentiment url with existing symbol is provided should navigate to sentiment page', () => {
    const symbol = 'AAPL';
    const finnhubUrl = Cypress.env('finnhubBaseUrl');
    const searchUrl = `${finnhubUrl}/search?*q=${symbol}*`;
    const getUrl = `${finnhubUrl}/stock/insider-sentiment?*symbol=${symbol}*from=*&to=*`;

    cy.intercept('GET', searchUrl, { fixture: 'aapl-search.json' }).as('search');
    cy.intercept('GET', getUrl, { fixture: 'aapl-sentiment.json' }).as('sentiment');

    cy.visit(`/sentiment/${symbol}`);

    cy.wait('@search');
    cy.wait('@sentiment');
    cy.checkSentimentPage();
  });

  it('when sentiment url with NOT existing symbol is provided should navigate to 404 page', () => {
    const symbol = 'DUMMY';
    const finnhubUrl = Cypress.env('finnhubBaseUrl');
    const searchUrl = `${finnhubUrl}/search?*q=${symbol}*`;
    const getUrl = `${finnhubUrl}/stock/insider-sentiment?*symbol=${symbol}*from=*&to=*`;

    cy.intercept('GET', searchUrl, { fixture: 'dummy-search.json' }).as('search');
    cy.intercept('GET', getUrl, { fixture: 'dummy-sentiment.json' }).as('sentiment');

    cy.visit(`/sentiment/${symbol}`);

    cy.wait('@search');
    cy.wait('@sentiment');
    cy.check404Page();
  });
});