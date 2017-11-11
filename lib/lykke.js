const axios = require('axios');
const querystring = require('querystring');

/**
 * API url
 * @type {String}
 */
const API_URL = 'https://api.lykkex.com';

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
 * Lykke API Client
 */
const Lykke = function() {};

/**
 * GET method
 * @param  {String} url           GET request url
 * @param  {Object} parameters    GET request params
 * @return {Promise}              Return a promise
 */
Lykke.prototype._get = function(url, parameters) {
    const getURL = API_URL + url;

    return axios.get(getURL + '?' + querystring.stringify(parameters));
};

/**
 * POST method
 * @param  {String} url           POST request url
 * @param  {Object} parameters    POST request params
 * @return {Promise}              Return a promise
 */
Lykke.prototype._post = function(url, parameters) {
    const postURL = API_URL + url;

    return axios.post(postURL, parameters);
};

/**
 * Method to get if an account exist
 * @param  {String} email         Account email
 * @param  {String} [partnerId]   Account partnerId
 * @return {Promise} Return a promise
 */
Lykke.prototype.accountExist = function(email, partnerId) {
    return this._get(API_BASE_PATH + 'AccountExist', {
        email,
        partnerId
    });
};

/**
 * Method to get API version
 * @return {Promise} Return a promise
 */
Lykke.prototype.version = function() {
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
Lykke.prototype.auth = function(email, password, clientInfo, partnerId) {
    return this._post(API_BASE_PATH + 'Auth', {
        email,
        password,
        clientInfo,
        partnerId
    });
};

module.exports = Lykke;
