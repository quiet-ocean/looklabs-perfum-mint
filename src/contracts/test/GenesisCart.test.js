const GenesisCart = artifacts.requrie('./GenesisCart.sol')
require('chai')
    .use(require('chai-as-promised'))
    .should()

contract(GenesisCart, ([deployer, seller, buyer]) => {
    let contract
    
    before(async () => {
        contract = await GenesisCart.deployed()
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
          const address = await contract.address
          assert.notEqual(address, 0x0)
          assert.notEqual(address, '')
          assert.notEqual(address, null)
          assert.notEqual(address, undefined)
        })
    
        it('has a name', async () => {
        //   const name = await marketplace.name()
        //   assert.equal(name, 'Dapp University Marketplace')
        })
        

    })
    discribe('checkout', async () => {
        it('checkout successfully', async () => {
            let oldSellerBalance
            oldSellerBalance = await web3.eth.getBalance(seller)
            console.log(oldSellerBalance)
            oldSellerBalance = new web3.utils.BN(oldSellerBalance)
            console.log(oldSellerBalance)

            result = await contract.checkOut(1, [3], { from: buyer, value: web3.utils.toWei('1', 'Ether')})

        })
    })
})