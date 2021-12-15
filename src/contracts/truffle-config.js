require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')

module.exports = {
  plugins: ['truffle-contract-size', 'truffle-plugin-verify'],

  networks: {
    development: {
      // host: process.env.RPC_HOST, // Localhost (default: none)
      host: '127.0.0.1',
      port: 7545,
      gas: 6721975,
      gasPrice: 20000000000,
      network_id: '*',
      // from: new HDWalletProvider(
      //   // process.env.KEY_MNEMONIC,
      //   // process.env.WALLET_PROVIDER_URL
      // ).getAddress(0),
    },

    rinkeby: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC || `choose vibrant quote furnace goose goat spread oblige thank scissors stumble segment`,
        // `https://rinkeby.infura.io/v3/7480cbb73c7d4bd4933527b0de354d85`
        process.env.PROVIDER_URL || `wss://rinkeby.infura.io/ws/v3/972cedb404854169847a6ecff2d82ee5`
      ),
      network_id: 4,
      gas: 20000000,
      gasPrice: 1580000000
    },

    live: {
      provider: function () {
        return new HDWalletProvider(
          process.env.MNEMONIC || `choose vibrant quote furnace goose goat spread oblige thank scissors stumble segment`,
          // `https://rinkeby.infura.io/v3/7480cbb73c7d4bd4933527b0de354d85`
          process.env.PROVIDER_URL || `wss://rinkeby.infura.io/ws/v3/7480cbb73c7d4bd4933527b0de354d85`
        )
      },
      network_id: 1,
      gasPrice: 50000000000,
    },

    // Useful for private networks
    // private: {
    // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
    // network_id: 2111,   // This network is yours, in the cloud.
    // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.8.4', // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {
      // See the solidity docs for advice about optimization and evmVersion
      // optimizer: {
      //     enabled: false,
      //     runs: 200,
      // },
      // evmVersion: "byzantium"
      // },
    },
  },

  etherscan: {
    apiKey: process.env.APIETHERSCAN,
  },
  api_keys: {
    etherscan: process.env.APIETHERSCAN
  },
}
