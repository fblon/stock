const finnhubUrl = Cypress.env('finnhubBaseUrl');

export function getSearchUrl(symbol: string) { return `${finnhubUrl}/search?*q=${symbol}*`; }

export function getSentimentUrl(symbol: string) { return `${finnhubUrl}/stock/insider-sentiment?*symbol=${symbol}*from=*&to=*`; }

export function getQuoteUrl(symbol: string) { return `${finnhubUrl}/quote?*symbol=${symbol}*`; }