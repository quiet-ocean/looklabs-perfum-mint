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

    const URL = 'https://cart-art.looklabs.xyz'

    const product_1 = await contract.addProduct(
      'Cyber EDP',
      utils.parseEther('0.001').toString(10),
      10,
      1,
      1,
      true,
      URL + '/cyber/'
    )
    const product_2 = await contract.addProduct(
      'Hoodie',
      utils.parseEther('0.002').toString(10),
      10,
      2,
      2,
      true,
      URL + '/hoodie/'
    )
    const product_3 = await contract.addProduct(
      'Fashion.Eight.Pass',
      utils.parseEther('0.003').toString(10),
      100,
      2,
      3,
      true,
      URL + '/eight/'
    )

    const product_4 = await contract.addProduct(
      'Corder.Art.Pass',
      utils.parseEther('0.004').toString(10),
      100,
      3,
      3,
      true,
      URL + '/coder/'
    )

    const products = await contract.getProducts()

    callback(colors.green(`⚡️: ${colors.white(products)}`))
  } catch (e) {
    console.log('$error', e)
    callback(e)
  }
}

module.exports = start
