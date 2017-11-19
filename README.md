# Lykke API Node Wrapper

[![Build Status](https://travis-ci.org/PierrickGT/node-lykke-api.svg?branch=master)](https://travis-ci.org/PierrickGT/node-lykke-api) [![npm version](https://badge.fury.io/js/node-lykke-api.svg)](https://badge.fury.io/js/node-lykke-api) [![dependencies Status](https://david-dm.org/PierrickGT/node-lykke-api/status.svg)](https://david-dm.org/PierrickGT/node-lykke-api) [![devDependencies Status](https://david-dm.org/PierrickGT/node-lykke-api/dev-status.svg)](https://david-dm.org/PierrickGT/node-lykke-api?type=dev)

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
https://lykke-public-api.azurewebsites.net/swagger/ui/index.html

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
