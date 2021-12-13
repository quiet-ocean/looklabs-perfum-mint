
# ELITE DROP WEB FRONT END
```
npm run start
```

## Metamask

Connect to RInkeby test network to run the front-ennd


## Solidity Smart contracts
src/contracts - main source of Solidity
##

**Make .env file**

Setup and envoirnment file in ***src/contracts*** with the following data:

```
KEY_MNEMONIC=<MNEMOICC>
INFURA_PROJECT_ID=<ID>
APIETHERSCAN='<API KEY>'
```
Contracts can be run using truffel-config and the following scripts in ***contracts/package.json***

**populate local dev**
```
"migrate:populate": "truffle migrate --network development --reset && yarn populate"
```
**populate rinkeby**
```
"migrate:rinkeby": "truffle migrate --network rinkeby --reset",
```
**populate live**
```
"migrate:live": "truffle migrate --network live"
```
**populate mainnet**
```
"populate": "truffle exec devops/mint.js"
```
**populate rinkeby**
```
"populate:rinkeby": "truffle exec --network rinkeby devops/mint.js",
```
**populate live using live script**
```
"populate:live": "truffle exec --network live devops/live.js",
```
**populate rinkeby dev**
```
"migrate:dev": "truffle exec --network rinkeby devops/dev.js"
```

**TODO**

 - Make src/contracts separete repo

