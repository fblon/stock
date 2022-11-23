/// <reference types="cypress" />

import { getQuoteUrl, getSearchUrl, getSentimentUrl } from 'cypress/support/utils';

describe('End To End tests', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it('Full interactions set with one stock', () => {

    cy.log('-----------------------------------------');
    cy.log('Load stock tracker page');
    cy.log('-----------------------------------------');

    cy.visit('/');

    cy.checkEmptyStockTrackerPage();

    cy.log('-----------------------------------------');
    cy.log('Add symbol');
    cy.log('-----------------------------------------');

    const symbol = 'TSLA';

    const searchUrl = getSearchUrl(symbol);
    const quoteUrl = getQuoteUrl(symbol);

    cy.intercept('GET', searchUrl, req => { req.reply({ statusCode: 200, fixture: 'tsla-search.json' }); }).as('search');
    cy.intercept('GET', quoteUrl, req => { req.reply({ statusCode: 200, fixture: 'tsla-quote.json' }); }).as('quote');

    cy.getStockInput().type(symbol);
    cy.getTrackButton().click();

    cy.wait(['@search', '@quote']);

    cy.checkStockOnStockTrackerPage(symbol);

    cy.log('-----------------------------------------');
    cy.log('Go to sentiment page');
    cy.log('-----------------------------------------');

    const sentimentUrl = getSentimentUrl(symbol);
    cy.intercept('GET', sentimentUrl, req => { req.reply({ statusCode: 200, fixture: 'tsla-sentiment.json' }); }).as('sentiment');

    cy.getGoToSentiment(symbol).click();

    cy.wait('@sentiment');
    cy.checkSentimentPage(symbol);

    cy.log('-----------------------------------------');
    cy.log('Go back to stock tracker page');
    cy.log('-----------------------------------------');

    cy.getSentimentBackBtn().click();

    cy.checkStockOnStockTrackerPage(symbol);

    cy.log('-----------------------------------------');
    cy.log('Delete stock');
    cy.log('-----------------------------------------');

    cy.getRemoveSentiment(symbol).click();

    cy.checkEmptyStockTrackerPage();
  });  
});