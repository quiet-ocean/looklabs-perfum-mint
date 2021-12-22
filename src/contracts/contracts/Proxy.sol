// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

// import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol';

import '../node_modules/@openzeppelin/contracts/access/Ownable.sol';

contract Proxy is Ownable {
  address private proxyAddr;
  mapping(address => address) childrenAddresses;

  event cartART(address indexed previousProxy, address indexed newProxy);
  event SetStoreContract(address _contract);

  modifier onlyProxy() {
    require(msg.sender == proxyAddr, 'Only Genesis Factory is allowed to mint tokens');
    _;
  }

  modifier onlyChildren() {
    require(msg.sender == childrenAddresses[msg.sender], 'Only cart.art children contracts');
    _;
  }

  function _approveChildContract(address _child) public onlyOwner {
    childrenAddresses[_child] = _child;
    emit SetStoreContract(_child);
  }

  function setProxy(address _newProxyAddr) public virtual onlyOwner {
    emit cartART(proxyAddr, _newProxyAddr);
    proxyAddr = _newProxyAddr;
  }

}
