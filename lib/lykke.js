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
 * Method to get all asset pairs rates
 * @return {Promise} Return a promise
 */
LykkePublicAPI.prototype.assetPairsRates = function() {
    return this._get(API_BASE_PATH + 'AssetPairs/rate', {});
};

/**
 * Method to get rates for asset pair
 * @param  {String} assetPairId    Asset Pair ID
 * @return {Promise} Return a promise
 */
LykkePublicAPI.prototype.assetPairRates = function(assetPairId) {
    return this._get(API_BASE_PATH + 'AssetPairs/rate/' + assetPairId);
};

/**
 * Method to get asset pairs dictionary
 * @return {Promise} Return a promise
 */
LykkePublicAPI.prototype.assetPairsDictionary = function() {
    return this._get(API_BASE_PATH + 'AssetPairs/dictionary');
};

/**
 * Method to get rates for specified period
 * @param  {Array} assetPairIds    Array of Asset Pair Ids
 * @param  {String} period         Period in 'Sec', 'Minute', 'Hour', 'Day', 'Month'
 * @param  {String} dateTime       Date time in the following format 2017-11-11T13:43:35.723Z
 * @return {Promise} Return a promise
 */
LykkePublicAPI.prototype.assetPairsRatesHistory = function(
    assetPairIds,
    period,
    dateTime
) {
    return this._post(API_BASE_PATH + 'AssetPairs/rate/history', {
        assetPairIds,
        period,
        dateTime
    });
};

/**
 * Method to get rates for specified period and asset pair
 * @param  {Array} assetPairId    Asset Pair Id
 * @param  {String} period        Period in 'Sec', 'Minute', 'Hour', 'Day', 'Month'
 * @param  {String} dateTime      Date time in the following format 2017-11-11T13:43:35.723Z
 * @return {Promise} Return a promise
 */
LykkePublicAPI.prototype.assetPairRatesHistory = function(
    assetPairId,
    period,
    dateTime
) {
    return this._post(API_BASE_PATH + 'AssetPairs/rate/history/' + assetPairId, {
        assetPairId,
        period,
        dateTime
    });
};

/**
 * Method to get assets dictionary
 * @return {Promise} Return a promise
 */
LykkePublicAPI.prototype.assetsDictionary = function() {
    return this._get(API_BASE_PATH + 'Assets/dictionary');
};

/**
 * Method to check if Lykke Public API is alive
 * @return {Promise} Return a promise
 */
LykkePublicAPI.prototype.isAlive = function() {
    return this._get(API_BASE_PATH + 'IsAlive', {});
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
