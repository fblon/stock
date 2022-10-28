/// <reference types="cypress" />

import { getQuoteUrl, getSearchUrl } from 'cypress/support/utils';

describe('Stock Tracker Page', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it('when default url is provided should remain on default page', () => {
    cy.visit('/');

    cy.checkStockTrackerPage();
  });

  it('when non existing url is provided should navigate to defaut page', () => {
    cy.visit('/test');

    cy.checkStockTrackerPage();
  });

  it('when local storage contains symbols should load and display related stocks', () => {
    const aaplSymbol = 'AAPL';
    const tslaSymbol = 'TSLA';
    const googlSymbol = 'GOOGL';
    const jsonStorage = JSON.stringify([aaplSymbol, tslaSymbol]);
    localStorage.setItem('stockSymbols', jsonStorage);

    const aaplSearchUrl = getSearchUrl(aaplSymbol);
    const aaplQuoteUrl = getQuoteUrl(aaplSymbol);
    const tslaSearchUrl = getSearchUrl(tslaSymbol);
    const tslaQuoteUrl = getQuoteUrl(tslaSymbol);
    const googlSearchUrl = getSearchUrl(googlSymbol);
    const googlQuoteUrl = getQuoteUrl(googlSymbol);

    cy.intercept('GET', aaplSearchUrl, req => { req.reply({ statusCode: 200, fixture: 'aapl-search.json' }); }).as('applSearch');
    cy.intercept('GET', tslaSearchUrl, req => { req.reply({ statusCode: 200, fixture: 'tsla-search.json' }); }).as('tslaSearch');
    cy.intercept('GET', googlSearchUrl, req => { req.reply({ statusCode: 200, fixture: 'googl-search.json' }); }).as('googlSearch');

    cy.intercept('GET', aaplQuoteUrl, req => { req.reply({ statusCode: 200, fixture: 'aapl-quote.json' }); }).as('applQuote');
    cy.intercept('GET', tslaQuoteUrl, req => { req.reply({ statusCode: 200, fixture: 'tsla-quote.json' }); }).as('tslaQuote');
    cy.intercept('GET', googlQuoteUrl, req => { req.reply({ statusCode: 200, fixture: 'googl-quote.json' }); }).as('googlQuote');

    cy.visit('/');

    cy.wait(['@applSearch', '@tslaSearch', '@googlSearch']);
    cy.wait(['@applQuote', '@tslaQuote', '@googlQuote']);

    cy.checkGoToSentimentPage(aaplSymbol);
    cy.checkGoToSentimentPage(tslaSymbol);
    cy.checkGoToSentimentPage(googlSymbol);

    cy.get('@applQuote.all').should('have.length', 1);
    cy.get('@tslaQuote.all').should('have.length', 1);
    cy.get('@googlQuote.all').should('have.length', 1);
  });
});