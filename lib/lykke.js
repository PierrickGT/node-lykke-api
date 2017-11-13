const axios = require('axios');
const querystring = require('querystring');

/**
 * Public API url
 * @type {String}
 */
const PUBLIC_API_URL = 'https://lykke-public-api.azurewebsites.net';

/**
 * Wallet API url
 * @type {String}
 */
const WALLET_API_URL = 'https://api.lykkex.com';

/**
 * API path
 * @type {String}
 */
const API_BASE_PATH = '/api/';

/**
 * Home path
 * @type {String}
 */
const HOME_BASE_PATH = '/home/';

/**
 * Lykke Public API Client
 */
const LykkePublicAPI = function() {};

/**
 * Lykke Walett API Client
 */
const LykkeWalettAPI = function() {};

/**
 * GET method for Lykke Public API
 * @param  {String} url           GET request url
 * @param  {Object} parameters    GET request params
 * @return {Promise}              Return a promise
 */
LykkePublicAPI.prototype._get = function(url, parameters) {
    const getURL = PUBLIC_API_URL + url;

    return axios.get(getURL + '?' + querystring.stringify(parameters));
};

/**
 * POST method for Lykke Public API
 * @param  {String} url           POST request url
 * @param  {Object} parameters    POST request params
 * @return {Promise}              Return a promise
 */
LykkePublicAPI.prototype._post = function(url, parameters, config) {
    const postURL = PUBLIC_API_URL + url;

    return axios.post(postURL, parameters, config);
};

/**
 * GET method for Lykke Walett API
 * @param  {String} url           GET request url
 * @param  {Object} parameters    GET request params
 * @return {Promise}              Return a promise
 */
LykkeWalettAPI.prototype._get = function(url, parameters) {
    const getURL = WALLET_API_URL + url;

    return axios.get(getURL + '?' + querystring.stringify(parameters));
};

/**
 * POST method for Lykke Walett API
 * @param  {String} url           POST request url
 * @param  {Object} parameters    POST request params
 * @return {Promise}              Return a promise
 */
LykkeWalettAPI.prototype._post = function(url, parameters, config) {
    const postURL = WALLET_API_URL + url;

    return axios.post(postURL, parameters, config);
};

/**
 * Method to get all asset pairs rates or rates for an asset pair
 * @param  {String} [assetPairId]    Asset Pair Id
 * @return {Promise} Return a promise
 */
LykkePublicAPI.prototype.assetPairsRates = function(assetPairId) {
    let query = '';

    if (assetPairId) {
        query = this._get(API_BASE_PATH + 'AssetPairs/rate/' + assetPairId);
    } else {
        query = this._get(API_BASE_PATH + 'AssetPairs/rate');
    }

    return query;
};

/**
 * Method to get asset pairs dictionary
 * @return {Promise} Return a promise
 */
LykkePublicAPI.prototype.assetPairsDictionary = function() {
    return this._get(API_BASE_PATH + 'AssetPairs/dictionary');
};

/**
 * Method to get rates fol several or one asset pair for a specified period
 * @param  {String|Array} assetPairIds    Asset Pair Id or Array of Asset Pair Ids
 * @param  {String} period                Period in 'Sec', 'Minute', 'Hour', 'Day', 'Month'
 * @param  {String} dateTime              Date time in the following format 2017-11-11T13:43:35.723Z
 * @return {Promise} Return a promise
 */
LykkePublicAPI.prototype.assetPairsRatesHistory = function(
    assetPairIds,
    period,
    dateTime
) {
    let query = '';

    if (typeof assetPairIds === 'string') {
        query = this._post(
            API_BASE_PATH + 'AssetPairs/rate/history/' + assetPairIds,
            {
                period,
                dateTime
            }
        );
    } else if (Array.isArray(assetPairIds)) {
        query = this._post(API_BASE_PATH + 'AssetPairs/rate/history', {
            assetPairIds,
            period,
            dateTime
        });
    }

    return query;
};

/**
 * Method to get assets dictionary
 * @return {Promise} Return a promise
 */
LykkePublicAPI.prototype.assetsDictionary = function() {
    return this._get(API_BASE_PATH + 'Assets/dictionary');
};

/**
 * Method to get Company Ownership Structure
 * @return {Promise} Return a promise
 */
LykkePublicAPI.prototype.companyOwnershipStructure = function() {
    return this._get(API_BASE_PATH + 'Company/ownershipStructure');
};

/**
 * Method to check if Lykke Public API is alive
 * @return {Promise} Return a promise
 */
LykkePublicAPI.prototype.isAlive = function() {
    return this._get(API_BASE_PATH + 'IsAlive', {});
};

/**
 * Method to get trade volumes for all available asset pairs or for an asset
 * @param  {String} [assetPairId]    Asset Pair Id
 * @return {Promise} Return a promise
 */
LykkePublicAPI.prototype.market = function(assetPairId) {
    let query = '';

    if (assetPairId) {
        query = this._get(API_BASE_PATH + 'Market/' + assetPairId);
    } else {
        query = this._get(API_BASE_PATH + 'Market');
    }

    return query;
};

/**
 * Method to get market capitalization for asset
 * @param  {String} assetPairId    Asset Pair Id
 * @return {Promise} Return a promise
 */
LykkePublicAPI.prototype.marketCapitalization = function(assetPairId) {
    return this._get(API_BASE_PATH + 'Market/capitalization/' + assetPairId);
};

/**
 * Method to get all orderbooks or orderbook for specified asset pair
 * @param  {String} [assetPairId]    Asset Pair Id
 * @return {Promise} Return a promise
 */
LykkePublicAPI.prototype.orderBook = function(assetPairId) {
    let query = '';

    if (assetPairId) {
        query = this._get(API_BASE_PATH + 'OrderBook/' + assetPairId);
    } else {
        query = this._get(API_BASE_PATH + 'OrderBook');
    }

    return query;
};

/**
 * Method to get last trades
 * @param  {Integer} n    Number of trades superior to zero
 * @return {Promise} Return a promise
 */
LykkePublicAPI.prototype.trades = function(n) {
    return this._get(API_BASE_PATH + 'Trades/Last', { n });
};

/**
 * Method to get Lykke Public API version
 * @return {Promise} Return a promise
 */
LykkePublicAPI.prototype.version = function() {
    return this._get(HOME_BASE_PATH + 'Version', {});
};

/**
 * Method to get if an account exist
 * @param  {String} email         Account email
 * @param  {String} [partnerId]   Account partnerId
 * @return {Promise} Return a promise
 */
LykkeWalettAPI.prototype.accountExist = function(email, partnerId) {
    return this._get(API_BASE_PATH + 'AccountExist', {
        email,
        partnerId
    });
};

/**
 * Method to get Lykke Walett API version
 * @return {Promise} Return a promise
 */
LykkeWalettAPI.prototype.version = function() {
    return this._get(HOME_BASE_PATH + 'Version', {});
};

/**
 * Method to authenticate
 * @param  {String} email           Account email
 * @param  {String} password        Account password
 * @param  {String} [clientInfo]    Account clientInfo
 * @param  {String} [partnerId]     Account partnerId
 * @return {Promise} Return a promise
 */
LykkeWalettAPI.prototype.auth = function(
    email,
    password,
    clientInfo,
    partnerId
) {
    return this._post(API_BASE_PATH + 'Auth', {
        email,
        password,
        clientInfo,
        partnerId
    });
};

module.exports = { LykkePublicAPI, LykkeWalettAPI };
