const axios = require('axios');
const querystring = require('querystring');

/**
 * Public API url
 * @type {String}
 * @return {String} Returns Public API url https://lykke-public-api.azurewebsites.net
 */
const PUBLIC_API_URL = 'https://lykke-public-api.azurewebsites.net';

/**
 * Wallet API url
 * @type {String}
 * @return {String} Returns Wallet API url https://api.lykkex.com
 */
const WALLET_API_URL = 'https://api.lykkex.com';

/**
 * API path
 * @type {String}
 * @return {String} Returns '/api/' path
 */
const API_BASE_PATH = '/api/';

/**
 * Home path
 * @type {String}
 * @return {String} Returns '/home/' path
 */
const HOME_BASE_PATH = '/home/';

/**
 * Lykke Public API Client
 * @return {Function}   Returns an empty function
 * @example
 * const publicAPI = new LykkePublicAPI();
 * publicAPI
    .isAlive()
    .then(response => {
        console.log(response.data);
        console.log(response.status);
    })
    .catch(error => {
        console.log(error);
    });
 */
const LykkePublicAPI = function() {};

/**
 * Lykke Wallet API Client
 * @return {Function}   Returns an empty function
 * @example
 * const walletAPI = new LykkeWalletAPI();
 * walletAPI
    .isAlive()
    .then(response => {
        console.log(response.data);
        console.log(response.status);
    })
    .catch(error => {
        console.log(error);
    });
 */
const LykkeWalletAPI = function() {};

/**
 * GET method for Lykke Public API
 * @constructor
 * @param  {String} url       GET request url
 * @param  {Object} params    GET request params
 * @return {Promise}          Returns a promise
 */
LykkePublicAPI.prototype._get = function(url, params) {
    const getURL = PUBLIC_API_URL + url;
    let query = '';

    if (params) {
        query = axios.get(getURL + '?' + querystring.stringify(params));
    } else {
        query = axios.get(getURL);
    }

    return query;
};

/**
 * POST method for Lykke Public API
 * @constructor
 * @param  {String} url       POST request url
 * @param  {Object} params    POST request params
 * @return {Promise}          Returns a promise
 */
LykkePublicAPI.prototype._post = function(url, params, config) {
    const postURL = PUBLIC_API_URL + url;

    return axios.post(postURL, params, config);
};

/**
 * GET method for Lykke Wallet API
 * @constructor
 * @param  {String} url       GET request url
 * @param  {Object} params    GET request params
 * @return {Promise}          Returns a promise
 */
LykkeWalletAPI.prototype._get = function(url, params) {
    const getURL = WALLET_API_URL + url;
    let query = '';

    if (params) {
        query = axios.get(getURL + '?' + querystring.stringify(params));
    } else {
        query = axios.get(getURL);
    }

    return query;
};

/**
 * POST method for Lykke Wallet API
 * @constructor
 * @param  {String} url       POST request url
 * @param  {Object} params    POST request params
 * @return {Promise}          Returns a promise
 */
LykkeWalletAPI.prototype._post = function(url, params, config) {
    const postURL = WALLET_API_URL + url;

    return axios.post(postURL, params, config);
};

/**
 * Method to get all asset pairs rates or rates for an asset pair
 * @constructor
 * @param  {String} [assetPairId]    Asset Pair Id
 * @return {Promise}                 Returns a promise
 * @example
 * publicAPI.assetPairsRates();
 * publicAPI.assetPairsRates('LKKEUR');
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
 * @constructor
 * @return {Promise}    Returns a promise
 * @example
 * publicAPI.assetPairsDictionary();
 */
LykkePublicAPI.prototype.assetPairsDictionary = function() {
    return this._get(API_BASE_PATH + 'AssetPairs/dictionary');
};

/**
 * Method to get rates fol several or one asset pair for a specified period
 * @constructor
 * @param  {String|Array} assetPairIds    Asset Pair Id or Array of Asset Pair Ids
 * @param  {String} period                Period in 'Sec', 'Minute', 'Hour', 'Day', 'Month'
 * @param  {String} dateTime              Date time in the following format 2017-11-11T13:43:35.723Z
 * @return {Promise}                      Returns a promise
 * @example
 * publicAPI.assetPairsRatesHistory(
    ['LKK1YEUR', 'LKKEUR'],
    'Day',
    '2017-11-11T13:43:35.723Z'
 * );
 * publicAPI.assetPairsRatesHistory(
    'LKKEUR',
    'Day',
    '2017-11-11T13:43:35.723Z'
 * );
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
 * @constructor
 * @return {Promise}    Returns a promise
 * @example
 * publicAPI.assetsDictionary();
 */
LykkePublicAPI.prototype.assetsDictionary = function() {
    return this._get(API_BASE_PATH + 'Assets/dictionary');
};

/**
 * Method to get Company Ownership Structure
 * @constructor
 * @return {Promise}    Returns a promise
 * @example
 * publicAPI.companyOwnershipStructure();
 */
LykkePublicAPI.prototype.companyOwnershipStructure = function() {
    return this._get(API_BASE_PATH + 'Company/ownershipStructure');
};

/**
 * Method to check if Lykke Public API is alive
 * @constructor
 * @return {Promise}    Returns a promise
 * @example
 * publicAPI.isAlive();
 */
LykkePublicAPI.prototype.isAlive = function() {
    return this._get(API_BASE_PATH + 'IsAlive');
};

/**
 * Method to get trade volumes for all available asset pairs or for an asset
 * @constructor
 * @param  {String} [assetPairId]    Asset Pair Id
 * @return {Promise}                 Returns a promise
 * @example
 * publicAPI.market();
 * publicAPI.market('LKKEUR');
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
 * @constructor
 * @param  {String} assetPairId    Asset Pair Id
 * @return {Promise}               Returns a promise
 * @example
 * publicAPI.marketCapitalization('LKKEUR');
 */
LykkePublicAPI.prototype.marketCapitalization = function(assetPairId) {
    return this._get(API_BASE_PATH + 'Market/capitalization/' + assetPairId);
};

/**
 * Method to get all orderbooks or orderbook for specified asset pair
 * @constructor
 * @param  {String} [assetPairId]    Asset Pair Id
 * @return {Promise}                 Returns a promise
 * @example
 * publicAPI.orderBook();
 * publicAPI.orderBook('LKKEUR');
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
 * @constructor
 * @param  {Integer} n    Number of trades superior to zero
 * @return {Promise}      Returns a promise
 * @example
 * publicAPI.trades(5);
 */
LykkePublicAPI.prototype.trades = function(n) {
    return this._get(API_BASE_PATH + 'Trades/Last', { n });
};

/**
 * Method to get Lykke Public API version
 * @constructor
 * @return {Promise}    Returns a promise
 * @example
 * publicAPI.version();
 */
LykkePublicAPI.prototype.version = function() {
    return this._get(HOME_BASE_PATH + 'Version');
};

/**
 * Method to get if an account exist
 * @constructor
 * @param  {String} email         Account email
 * @param  {String} [partnerId]   Account partnerId
 * @return {Promise}              Returns a promise
 * @example
 * walletAPI.accountExist('test@me.com');
 */
LykkeWalletAPI.prototype.accountExist = function(email, partnerId) {
    return this._get(API_BASE_PATH + 'AccountExist', {
        email,
        partnerId
    });
};

/**
 * Method to authenticate
 * @constructor
 * @param  {String} email           Account email
 * @param  {String} password        Account password
 * @param  {String} [clientInfo]    Account clientInfo
 * @param  {String} [partnerId]     Account partnerId
 * @return {Promise}                Returns a promise
 * @example
 * walletAPI.auth('test@me.com', 'testpassword');
 */
LykkeWalletAPI.prototype.auth = function(
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

/**
 * Method to check if Lykke Wallet API is alive
 * @constructor
 * @return {Promise}    Returns a promise
 * @example
 * walletAPI.isAlive();
 */
LykkeWalletAPI.prototype.isAlive = function() {
    return this._get(API_BASE_PATH + 'IsAlive');
};

/**
 * Method to get Lykke Wallet API version
 * @constructor
 * @return {Promise}    Returns a promise
 * @example
 * walletAPI.version();
 */
LykkeWalletAPI.prototype.version = function() {
    return this._get(HOME_BASE_PATH + 'Version');
};

module.exports = {
    PUBLIC_API_URL,
    WALLET_API_URL,
    API_BASE_PATH,
    HOME_BASE_PATH,
    LykkePublicAPI,
    LykkeWalletAPI
};
