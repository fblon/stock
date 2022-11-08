/// <reference types="cypress" />

import { getSearchUrl, getSentimentUrl } from 'cypress/support/utils';

describe('Sentiment Page', () => {

  describe('Happy Cases', () => {
    it('when sentiment url with existing symbol is provided should navigate to sentiment page', () => {
      const symbol = 'AAPL';
      const searchUrl = getSearchUrl(symbol);
      const sentimentUrl = getSentimentUrl(symbol);

      cy.intercept('GET', searchUrl, req => { req.reply({ statusCode: 200, fixture: 'aapl-search.json' }); }).as('search');
      cy.intercept('GET', sentimentUrl, req => { req.reply({ statusCode: 200, fixture: 'aapl-sentiment.json' }); }).as('sentiment');

      cy.visit(`/sentiment/${symbol}`)
        .then(() => cy.checkSpinner());

      cy.wait(['@search', '@sentiment']);
      cy.checkSentimentPage(symbol);
    });

  });

  describe('Error Cases', () => {
    it('when sentiment url WITHOUT a symbol is provided should navigate to default page', () => {
      cy.visit('/sentiment');

      cy.checkEmptyStockTrackerPage();
    });

    it('when sentiment url with NOT existing symbol is provided should navigate to 404 page', () => {
      const symbol = 'DUMMY';
      const searchUrl = getSearchUrl(symbol);
      const sentimentUrl = getSentimentUrl(symbol);

      cy.intercept('GET', searchUrl, { fixture: 'dummy-search.json' }).as('search');
      cy.intercept('GET', sentimentUrl, { fixture: 'dummy-sentiment.json' }).as('sentiment');

      cy.visit(`/sentiment/${symbol}`)
        .then(() => cy.checkSpinner());

      cy.wait(['@search', '@sentiment']);
      cy.check404Page();
    });

    it('when search call is not authorized should navigate to 404 page', () => {
      const symbol = 'AAPL';
      const searchUrl = getSearchUrl(symbol);
      const sentimentUrl = getSentimentUrl(symbol);

      cy.intercept('GET', searchUrl, req => { req.reply({ statusCode: 401, body: '{"error":"Invalid API key"}' }); }).as('search');
      cy.intercept('GET', sentimentUrl, req => { req.reply({ statusCode: 200, fixture: 'aapl-sentiment.json' }); }).as('sentiment');

      cy.visit(`/sentiment/${symbol}`);

      cy.wait('@search');
      cy.check404Page();
    });

    it('when sentiment call is not authorized should display stock with empty sentiment', () => {
      const symbol = 'AAPL';
      const searchUrl = getSearchUrl(symbol);
      const sentimentUrl = getSentimentUrl(symbol);

      cy.intercept('GET', searchUrl, req => { req.reply({ statusCode: 200, fixture: 'aapl-search.json' }); }).as('search');
      cy.intercept('GET', sentimentUrl, req => { req.reply({ statusCode: 401, body: '{"error":"Invalid API key"}' }); }).as('sentiment');

      cy.visit(`/sentiment/${symbol}`);

      cy.wait('@sentiment');
      cy.checkSentimentPage(symbol);
    });
  });
});