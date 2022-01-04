// # use describe, it pattern
import Web3 from 'web3'
import { transaction, receipt } from './data.json'

describe("Web 3 test", () => {
  it("parse event log", () => {
    const web3 = new Web3()
    const typesArray = [
      {type: 'uint256', name: 'productId'}
    ]
    let data = receipt.logs[0].data
    const decodedParameters = web3.eth.abi.decodeParameters(typesArray, data)
    // console.log(JSON.stringify(decodedParameters, null, 1));
    console.log(decodedParameters[0])
  });
});
