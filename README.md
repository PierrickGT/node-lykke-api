# Lykke API Node Wrapper

[![Build Status](https://travis-ci.org/PierrickGT/node-lykke-api.svg?branch=master)](https://travis-ci.org/PierrickGT/node-lykke-api) [![npm version](https://badge.fury.io/js/node-lykke-api.svg)](https://badge.fury.io/js/node-lykke-api) [![Known Vulnerabilities](https://snyk.io/test/github/PierrickGT/node-lykke-api/badge.svg?targetFile=package.json)](https://snyk.io/test/github/PierrickGT/node-lykke-api?targetFile=package.json) [![Coverage Status](https://coveralls.io/repos/github/PierrickGT/node-lykke-api/badge.svg?branch=master)](https://coveralls.io/github/PierrickGT/node-lykke-api?branch=master) [![Latest Documentation](https://doxdox.org/images/badge-flat.svg)](https://doxdox.org/PierrickGT/node-lykke-api) [![dependencies Status](https://david-dm.org/PierrickGT/node-lykke-api/status.svg)](https://david-dm.org/PierrickGT/node-lykke-api) [![devDependencies Status](https://david-dm.org/PierrickGT/node-lykke-api/dev-status.svg)](https://david-dm.org/PierrickGT/node-lykke-api?type=dev)

## Installation
```
npm install --save node-lykke-api
```

## Usage
```
// Import the desired module
const { LykkePublicAPI, LykkeWalettAPI } = require('node-lykke-api');

// Create an instance
const publicAPI = new LykkePublicAPI();
const walettAPI = new LykkeWalettAPI();

// Get stuff done
publicAPI
    .isAlive()
    .then(response => {
        console.log(response.data);
        console.log(response.status);
    })
    .catch(error => {
        console.log(error);
    });

walettAPI
    .isAlive()
    .then(response => {
        console.log(response.data);
        console.log(response.status);
    })
    .catch(error => {
        console.log(error);
    });
```

## Methods

### Lykke Public API
https://public-api.lykke.com

#### AssetPairs
```
assetPairsRates()
assetPairsRates(assetPairId)
assetPairsDictionary()
assetPairsRatesHistory(assetPairIds, period, dateTime)
```

#### Assets
```
assetsDictionary()
```

#### Company
```
companyOwnershipStructure()
```

#### IsAlive
```
isAlive()
```

#### Market
```
market()
market(assetPairId)
marketCapitalization(assetPairId)
```

#### OrderBook
```
orderBook()
orderBook(assetPairId)
```

#### Trades
```
trades(n)
```

#### Version
```
version()
```

### Lykke Wallet API
https://api.lykkex.com/swagger/ui/index/index.html

Incomplete API, a V2 is in progress.
https://www.reddit.com/r/lykke/comments/6u20kq/is_the_api_ready_or_still_in_progress/

#### AccountExist
```
accountExist(email, partnerId)
```

#### Auth
```
auth(email, password, clientInfo, partnerId)
```

#### IsAlive
```
isAlive()
```

#### Version
```
version()
```

## Contributors
* **Justin Levinson** _([@justinlevinson](https://github.com/justinlevinson))_
