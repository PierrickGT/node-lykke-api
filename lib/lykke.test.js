const axios = require('axios');
const querystring = require('querystring');
const MockAdapter = require('axios-mock-adapter');

const {
    PUBLIC_API_URL,
    WALLET_API_URL,
    API_BASE_PATH,
    HOME_BASE_PATH,
    LykkePublicAPI,
    LykkeWalletAPI
} = require('./lykke.js');

const publicAPI = new LykkePublicAPI();
const walletAPI = new LykkeWalletAPI();

const mock = new MockAdapter(axios);

const testRequest = (request, done) => {
    request
        .then(response => {
            expect(response.status).toEqual(200);
            done();
        })
        .catch(error => {
            console.log('error', error);
            done.fail(error);
        });
};

const mockAPIGetRequest = (apiUrl, path, params) => {
    let query = '';

    if (params) {
        query = apiUrl + path + '?' + querystring.stringify(params);
    } else {
        query = apiUrl + path;
    }

    mock.onGet(query).reply(200);
};

const mockPublicAPIGetRequest = (path, params) => {
    mockAPIGetRequest(PUBLIC_API_URL, path, params);
};

const mockPublicAPIPostRequest = (path, params) => {
    mock.onPost(PUBLIC_API_URL + path, params).reply(200);
};

const mockWalletAPIGetRequest = (path, params) => {
    mockAPIGetRequest(WALLET_API_URL, path, params);
};

const mockWalletAPIPostRequest = (path, params) => {
    mock.onPost(WALLET_API_URL + path, params).reply(200);
};

describe('Lykke Public API', () => {
    it('should get all asset pairs rates', done => {
        mockPublicAPIGetRequest(API_BASE_PATH + 'AssetPairs/rate');
        testRequest(publicAPI.assetPairsRates(), done);
    });

    it('should get rates for an asset pair', done => {
        mockPublicAPIGetRequest(API_BASE_PATH + 'AssetPairs/rate/' + 'LKKEUR');
        testRequest(publicAPI.assetPairsRates('LKKEUR'), done);
    });

    it('should get asset pairs dictionary', done => {
        mockPublicAPIGetRequest(API_BASE_PATH + 'AssetPairs/dictionary');
        testRequest(publicAPI.assetPairsDictionary(), done);
    });

    it('should get rates for several asset pairs for a specified period', done => {
        mockPublicAPIPostRequest(API_BASE_PATH + 'AssetPairs/rate/history', {
            assetPairIds: ['LKK1YEUR', 'LKKEUR'],
            period: 'Day',
            dateTime: '2017-11-11T13:43:35.723Z'
        });
        testRequest(
            publicAPI.assetPairsRatesHistory(
                ['LKK1YEUR', 'LKKEUR'],
                'Day',
                '2017-11-11T13:43:35.723Z'
            ),
            done
        );
    });

    it('should get rates for one asset pair for a specified period', done => {
        mockPublicAPIPostRequest(
            API_BASE_PATH + 'AssetPairs/rate/history/' + 'LKKEUR',
            {
                period: 'Day',
                dateTime: '2017-11-11T13:43:35.723Z'
            }
        );
        testRequest(
            publicAPI.assetPairsRatesHistory(
                'LKKEUR',
                'Day',
                '2017-11-11T13:43:35.723Z'
            ),
            done
        );
    });

    it('should get assets dictionary', done => {
        mockPublicAPIGetRequest(API_BASE_PATH + 'Assets/dictionary');
        testRequest(publicAPI.assetsDictionary(), done);
    });

    it('should get Company Ownership Structure', done => {
        mockPublicAPIGetRequest(API_BASE_PATH + 'Company/ownershipStructure');
        testRequest(publicAPI.companyOwnershipStructure(), done);
    });

    it('should be alive', done => {
        mockPublicAPIGetRequest(API_BASE_PATH + 'IsAlive');
        testRequest(publicAPI.isAlive(), done);
    });

    it('should get trade volumes for all available asset pairs', done => {
        mockPublicAPIGetRequest(API_BASE_PATH + 'Market');
        testRequest(publicAPI.market(), done);
    });

    it('should get trade volumes for an asset pair', done => {
        mockPublicAPIGetRequest(API_BASE_PATH + 'Market/' + 'LKKEUR');
        testRequest(publicAPI.market('LKKEUR'), done);
    });

    it('should get market capitalization for asset', done => {
        mockPublicAPIGetRequest(
            API_BASE_PATH + 'Market/capitalization/' + 'LKKEUR'
        );
        testRequest(publicAPI.marketCapitalization('LKKEUR'), done);
    });

    it('should get all orderbooks', done => {
        mockPublicAPIGetRequest(API_BASE_PATH + 'OrderBook');
        testRequest(publicAPI.orderBook(), done);
    });

    it('should get all orderbook for specified asset pair', done => {
        mockPublicAPIGetRequest(API_BASE_PATH + 'OrderBook/' + 'LKKEUR');
        testRequest(publicAPI.orderBook('LKKEUR'), done);
    });

    it('should get last trades', done => {
        mockPublicAPIGetRequest(API_BASE_PATH + 'Trades/Last', { n: 5 });
        testRequest(publicAPI.trades(5), done);
    });

    it('should get API version', done => {
        mockPublicAPIGetRequest(HOME_BASE_PATH + 'Version');
        testRequest(publicAPI.version(), done);
    });
});

describe('Lykke Wallet API', () => {
    it('should check if an account exist', done => {
        mockWalletAPIGetRequest(API_BASE_PATH + 'AccountExist', {
            email: 'test@me.com',
            partnerId: ''
        });
        testRequest(walletAPI.accountExist('test@me.com'), done);
    });

    it('should authenticate', done => {
        mockWalletAPIPostRequest(API_BASE_PATH + 'Auth', {
            email: 'test@me.com',
            password: 'testpassword'
        });
        testRequest(walletAPI.auth('test@me.com', 'testpassword'), done);
    });

    it('should check if API is alive', done => {
        mockWalletAPIGetRequest(API_BASE_PATH + 'IsAlive');
        testRequest(walletAPI.isAlive(), done);
    });

    it('should get API version', done => {
        mockWalletAPIGetRequest(HOME_BASE_PATH + 'Version');
        testRequest(walletAPI.version(), done);
    });
});
