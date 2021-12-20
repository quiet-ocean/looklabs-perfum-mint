require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')

module.exports = {
  plugins: ['truffle-contract-size', 'truffle-plugin-verify'],

  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      gas: 6721975,
      gasPrice: 20000000000,
      network_id: '*',
    },

    rinkeby: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, process.env.PROVIDER_URL),
      network_id: 4,
      gas: 20000000,
      gasPrice: 1580000000,
    },

    live: {
      provider: function () {
        return new HDWalletProvider(process.env.KEY_MNEMONIC, process.env.PROVIDER_URL)
      },
      network_id: 1,
      gasPrice: 50000000000,
    },
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
    etherscan: process.env.APIETHERSCAN,
  },
}
