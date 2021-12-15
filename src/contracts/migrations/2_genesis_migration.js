const colors = require('colors')
const Helper = artifacts.require('Helper')
const GenesisCart = artifacts.require('GenesisCart')
const CartERC721 = artifacts.require('CartERC721')
const CartERC1155 = artifacts.require('CartERC1155')
const addOnContract = artifacts.require('addOnContract')

module.exports = async (deployer, network, addresses) => {
    await deployer.deploy(Helper);

    await deployer.link(Helper, [GenesisCart]);
    
    await deployer.deploy(GenesisCart);
    await deployer.deploy(CartERC721, GenesisCart.address);
    await deployer.deploy(CartERC1155, GenesisCart.address);
    await deployer.deploy(addOnContract, GenesisCart.address);
}