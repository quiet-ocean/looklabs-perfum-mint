require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const colors = require('colors')
const fetch = require('node-fetch')
const { utils, ethers } = require('ethers')
const Cyber = artifacts.require('Cyber.sol')

const { SERVICE_URL } = process.env

const start = async callback => {
    try {
        // const currentTokens = await (await fetch(`${SERVICE_URL}/token`)).json()

        const accounts = () =>
            new HDWalletProvider({
                mnemonic: process.env.KEY_MNEMONIC,
                providerOrUrl: `https://mainnet.infura.io/v3/972cedb404854169847a6ecff2d82ee5`,
                addressIndex: 0,
            })

        console.log(accounts, '>>>')

        const FROM = ethers.utils.getAddress(accounts().getAddresses()[0])


        const contract = await Cyber.deployed()
        // const token = await contract.tokensOfOwner('0x30D47Bd2A8A8e6d898467e0822A3bbE2399bDf8f')
        // const token = await contract.reserve(10)
        // const token = await contract.setBaseURI('https://nft.looklabs.xyz/cyber/token/')
        // const token = await contract.mintCyber(2)
        // const token = await contract.setPrice('200000000000000000')
        const token = await contract.totalSupply()
        // const token = await contract.setVault('0x7C417Bd0a6FC2580331342cAe078D763CC21d139')
        // const setDiscount = await contract.checkOut(1,[1,2], {value: utils.parseEther('0.6').toString(10)})
        // const token = await contract.withdrawAll()

        callback(colors.green(`⚡️: ${colors.white(token)}`))
    } catch (e) {
        console.log('$error', e)
        callback(e)
    }
}

module.exports = start