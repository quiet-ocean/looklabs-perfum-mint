require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const colors = require('colors')
const fetch = require('node-fetch')
const { utils } = require('ethers')
const GenesisCart = artifacts.require('GenesisCart.sol')
const CartERC721 = artifacts.require('CartERC721.sol')

const { SERVICE_URL } = process.env

const start = async callback => {
  try {
    const accounts = () =>
      new HDWalletProvider(
        process.env.MNEMONIC ||
        `choose vibrant quote furnace goose goat spread oblige thank scissors stumble segment`,
        process.env.PROVIDER_URL || `wss://rinkeby.infura.io/ws/v3/7480cbb73c7d4bd4933527b0de354d85`
      )

    console.log(accounts, '>>>')

    const FROM = utils.getAddress(accounts().getAddresses()[0])

    const contract = await GenesisCart.deployed()

    // const setVault = await contract.setVault("0x03EF36C4A2ad9f53616a32Bf5C41510ee0c06237");
    // const withdraw = await contract.withdrawAll();

    // const contract2 = await CartERC721.deployed()

    // TESTING FUNCTIONS, UNCOMMENT TO POPULATE OR BUY
    const URL = process.env.API_URL ? process.env.API_URL : 'https://elite.looklabs.xyz'
    const updateStock = await contract.updateStock(0, 10);
    const products = await contract.getProducts()

    callback(colors.green(`⚡️: ${colors.white(products)}`))
  } catch (e) {
    console.log('$error', e)
    callback(e)
  }
}

module.exports = start
