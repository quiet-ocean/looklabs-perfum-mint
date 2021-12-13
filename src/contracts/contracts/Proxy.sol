// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

import '../node_modules/@openzeppelin/contracts/access/Ownable.sol';

contract Proxy is Ownable {
  address private proxyAddr;

  event cartART(address indexed previousProxy, address indexed newProxy);

  modifier onlyProxy() {
    require(msg.sender == proxyAddr, 'Only Genesis Factory is allowed to mint tokens');
    _;
  }

  function setProxy(address _newProxyAddr) public virtual onlyOwner {
    emit cartART(proxyAddr, _newProxyAddr);
    proxyAddr = _newProxyAddr;
  }

  // check if token onlyOwner
}
