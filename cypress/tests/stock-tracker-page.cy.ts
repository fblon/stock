/// <reference types="cypress" />

import { getQuoteUrl, getSearchUrl } from 'cypress/support/utils';

describe('Stock Tracker Page', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  describe('Happy Cases', () => {
    it('when default url is provided should remain on stock tracker page', () => {
      cy.visit('/');

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

      cy.checkStockOnStockTrackerPage(aaplSymbol);
      cy.checkStockOnStockTrackerPage(tslaSymbol);
      cy.checkStockOnStockTrackerPage(googlSymbol);

      cy.get('@aaplQuote.all').should('have.length', 1);
      cy.get('@tslaQuote.all').should('have.length', 1);
      cy.get('@googlQuote.all').should('have.length', 1);
    });

    it('when user enters and track existing symbol should appear in the list', () => {

      const symbol = 'tsla';

      const searchUrl = getSearchUrl(symbol);
      const quoteUrl = getQuoteUrl(symbol);

      cy.intercept('GET', searchUrl, req => { req.reply({ statusCode: 200, fixture: 'tsla-search.json' }); }).as('search');
      cy.intercept('GET', quoteUrl, req => { req.reply({ statusCode: 200, fixture: 'tsla-quote.json' }); }).as('quote');

      cy.visit('/');
      
      cy.getStockInput().type(symbol);
      cy.getTrackButton().click();

      cy.wait(['@search', '@quote']);

      cy.checkStockOnStockTrackerPage(symbol);
    });
  });

  describe('Error Cases', () => {
    it('when non existing url is provided should navigate to stock tracker page', () => {
      cy.visit('/test');

      cy.checkEmptyStockTrackerPage();
    });

    it('when user enters and track NOT existing symbol should display error', () => {

      const symbol = 'dummy';

      const searchUrl = getSearchUrl(symbol);
      const quoteUrl = getQuoteUrl(symbol);

      cy.intercept('GET', searchUrl, req => { req.reply({ statusCode: 200, fixture: 'dummy-search.json' }); }).as('search');
      cy.intercept('GET', quoteUrl, req => { req.reply({ statusCode: 200, fixture: 'dummy-quote.json' }); }).as('quote');

      cy.visit('/');
      
      cy.getStockInput().type(symbol);
      cy.getTrackButton().click();

      cy.contains('Stock does NOT exist: DUMMY');
      cy.checkEmptyStockTrackerPage();
    });

    it('when user enters and track ALREADY tracked symbol should display warning', () => {
      const symbol = 'TSLA';
      const jsonStorage = JSON.stringify([symbol]);
      localStorage.setItem('stockSymbols', jsonStorage);

      const searchUrl = getSearchUrl(symbol);
      const quoteUrl = getQuoteUrl(symbol);

      cy.intercept('GET', searchUrl, req => { req.reply({ statusCode: 200, fixture: 'tsla-search.json' }); }).as('search');
      cy.intercept('GET', quoteUrl, req => { req.reply({ statusCode: 200, fixture: 'tsla-quote.json' }); }).as('quote');

      cy.visit('/');
      
      cy.getStockInput().type(symbol);
      cy.getTrackButton().click();

      cy.contains('Stock is already being tracked: TSLA');
      cy.checkStockOnStockTrackerPage(symbol);
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

    it('when search call is not authorized should not display symbol', () => {
      const aaplSymbol = 'AAPL';
      const jsonStorage = JSON.stringify([aaplSymbol]);
      localStorage.setItem('stockSymbols', jsonStorage);

      const aaplSearchUrl = getSearchUrl(aaplSymbol);
      const aaplQuoteUrl = getQuoteUrl(aaplSymbol);

      cy.intercept('GET', aaplSearchUrl, req => { req.reply({ statusCode: 401, body: '{"error":"Invalid API key"}' }); }).as('aaplSearch');

      cy.intercept('GET', aaplQuoteUrl, req => { req.reply({ statusCode: 200, fixture: 'aapl-quote.json' }); }).as('aaplQuote');

      cy.visit('/');

      cy.wait(['@aaplSearch']);

      cy.checkEmptyStockTrackerPage();
    });

    it('when quote call is not authorized should display stock with empty quote', () => {
      const aaplSymbol = 'AAPL';
      const jsonStorage = JSON.stringify([aaplSymbol]);
      localStorage.setItem('stockSymbols', jsonStorage);

      const aaplSearchUrl = getSearchUrl(aaplSymbol);
      const aaplQuoteUrl = getQuoteUrl(aaplSymbol);

      cy.intercept('GET', aaplSearchUrl, req => { req.reply({ statusCode: 200, fixture: 'aapl-search.json' }); }).as('aaplSearch');

      cy.intercept('GET', aaplQuoteUrl, req => { req.reply({ statusCode: 401, body: '{"error":"Invalid API key"}' }); }).as('aaplQuote');

      cy.visit('/');

      cy.wait(['@aaplQuote']);

      cy.checkStockOnStockTrackerPage(aaplSymbol);
    });
  });
});