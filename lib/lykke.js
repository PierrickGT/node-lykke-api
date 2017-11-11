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

  return axios.get(getURL, querystring.stringify(parameters));
};

/**
 * Method to get API version
 * @return {Promise} Return a promise
 */
Lykke.prototype.getVersion = function() {
  return this._get(HOME_BASE_PATH + 'Version', {});
};

module.exports = Lykke;
