/// <reference types="cypress" />

import { getQuoteUrl, getSearchUrl } from 'cypress/support/utils';

describe('Stock Tracker Page', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it('when default url is provided should remain on stock tracker page', () => {
    cy.visit('/');

    cy.checkEmptyStockTrackerPage();
  });

  it('when non existing url is provided should navigate to stock tracker page', () => {
    cy.visit('/test');

    cy.checkEmptyStockTrackerPage();
  });

  it('when local storage contains symbols should load and display related stocks', () => {
    const aaplSymbol = 'AAPL';
    const tslaSymbol = 'TSLA';
    const googlSymbol = 'GOOGL';
    const jsonStorage = JSON.stringify([aaplSymbol, tslaSymbol, googlSymbol]);
    localStorage.setItem('stockSymbols', jsonStorage);

    const aaplSearchUrl = getSearchUrl(aaplSymbol);
    const aaplQuoteUrl = getQuoteUrl(aaplSymbol);
    const tslaSearchUrl = getSearchUrl(tslaSymbol);
    const tslaQuoteUrl = getQuoteUrl(tslaSymbol);
    const googlSearchUrl = getSearchUrl(googlSymbol);
    const googlQuoteUrl = getQuoteUrl(googlSymbol);

    cy.intercept('GET', aaplSearchUrl, req => { req.reply({ statusCode: 200, fixture: 'aapl-search.json' }); }).as('aaplSearch');
    cy.intercept('GET', tslaSearchUrl, req => { req.reply({ statusCode: 200, fixture: 'tsla-search.json' }); }).as('tslaSearch');
    cy.intercept('GET', googlSearchUrl, req => { req.reply({ statusCode: 200, fixture: 'googl-search.json' }); }).as('googlSearch');

    cy.intercept('GET', aaplQuoteUrl, req => { req.reply({ statusCode: 200, fixture: 'aapl-quote.json' }); }).as('aaplQuote');
    cy.intercept('GET', tslaQuoteUrl, req => { req.reply({ statusCode: 200, fixture: 'tsla-quote.json' }); }).as('tslaQuote');
    cy.intercept('GET', googlQuoteUrl, req => { req.reply({ statusCode: 200, fixture: 'googl-quote.json' }); }).as('googlQuote');

    cy.visit('/');

    cy.wait(['@aaplSearch', '@tslaSearch', '@googlSearch']);
    cy.wait(['@aaplQuote', '@tslaQuote', '@googlQuote']);

    cy.checkGoToSentimentPage(aaplSymbol);
    cy.checkGoToSentimentPage(tslaSymbol);
    cy.checkGoToSentimentPage(googlSymbol);

    cy.get('@aaplQuote.all').should('have.length', 1);
    cy.get('@tslaQuote.all').should('have.length', 1);
    cy.get('@googlQuote.all').should('have.length', 1);
  });

  it('when local storage contains dummy symbol should display empty tracker page', () => {
    const dummySymbol = 'DUMMY';
    const jsonStorage = JSON.stringify([dummySymbol]);
    localStorage.setItem('stockSymbols', jsonStorage);

    const dummySearchUrl = getSearchUrl(dummySymbol);
    const dummyQuoteUrl = getQuoteUrl(dummySymbol);

    cy.intercept('GET', dummySearchUrl, req => { req.reply({ statusCode: 200, fixture: 'dummy-search.json' }); }).as('dummySearch');
    cy.intercept('GET', dummyQuoteUrl, req => { req.reply({ statusCode: 200, fixture: 'dummy-quote.json' }); }).as('dummyQuote');

    cy.visit('/');

    cy.checkEmptyStockTrackerPage();
  });  
});