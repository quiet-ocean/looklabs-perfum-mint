require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const colors = require('colors')
const fetch = require('node-fetch')
const { utils } = require('ethers')
const GenesisCart = artifacts.require('GenesisCart.sol')

const { SERVICE_URL } = process.env

const start = async callback => {
  try {
    const accounts = () =>
      new HDWalletProvider(
        process.env.MNEMONIC ||
        `choose vibrant quote furnace goose goat spread oblige thank scissors stumble segment`,
        process.env.PROVIDER_URL || `wss://rinkeby.infura.io/ws/v3/7480cbb73c7d4bd4933527b0de354d85`
      )

    const FROM = utils.getAddress(accounts().getAddresses()[0])

    const contract = await GenesisCart.deployed()
    const deleteProduct = await contract.deleteProduct(1);
    const products = await contract.getProducts()

    callback(colors.green(`⚡️: ${colors.white(products)}`))
  } catch (e) {
    console.log('$error', e)
    callback(e)
  }
}

module.exports = start
