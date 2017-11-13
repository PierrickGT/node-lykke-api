const axios = require('axios');

const { LykkePublicAPI, LykkeWalettAPI } = require('./lykke.js');

const publicAPI = new LykkePublicAPI();

const testRequest = (request, done) => {
    request
    .then(response => {
        expect(response.status).toEqual(200);
        done();
    })
    .catch(error => {
        done.fail(error);
    });
}

describe('Lykke Public API', () => {
    it('should get all asset pairs rates', (done) => {
        testRequest(publicAPI.assetPairsRates(), done);
    });

    it('should get rates for an asset pair', (done) => {
        testRequest(publicAPI.assetPairsRates('LKKEUR'), done);
    });

    it('should get asset pairs dictionary', (done) => {
        testRequest(publicAPI.assetPairsDictionary(), done);
    });

    it('should get rates for several asset pairs for a specified period', (done) => {
        testRequest(publicAPI.assetPairsRatesHistory(['LKK1YEUR', 'LKKEUR'], 'Day', '2017-11-11T13:43:35.723Z'), done);
    });

    it('should get rates for one asset pair for a specified period', (done) => {
        testRequest(publicAPI.assetPairsRatesHistory('LKKEUR', 'Day', '2017-11-11T13:43:35.723Z'), done);
    });

    it('should get assets dictionary', (done) => {
        testRequest(publicAPI.assetsDictionary(), done);
    });

    it('should get Company Ownership Structure', (done) => {
        testRequest(publicAPI.companyOwnershipStructure(), done);
    });

    it('should be alive', (done) => {
        testRequest(publicAPI.isAlive(), done);
    });

    it('should get trade volumes for all available asset pairs', (done) => {
        testRequest(publicAPI.market(), done);
    });

    it('should get trade volumes for an asset pair', (done) => {
        testRequest(publicAPI.market('LKKEUR'), done);
    });

    it('should get market capitalization for asset', (done) => {
        testRequest(publicAPI.marketCapitalization('LKKEUR'), done);
    });

    it('should get all orderbooks', (done) => {
        testRequest(publicAPI.orderBook(), done);
    });

    it('should get all orderbook for specified asset pair', (done) => {
        testRequest(publicAPI.orderBook('LKKEUR'), done);
    });

    it('should get last trades', (done) => {
        testRequest(publicAPI.trades(5), done);
    });

    it('should get API version', (done) => {
        testRequest(publicAPI.version(), done);
    });
})
