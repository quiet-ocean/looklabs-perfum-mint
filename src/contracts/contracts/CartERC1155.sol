// CYBER
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

// import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/extensions/ERC1155Supply.sol';
// import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol';
// import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol';
// import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Strings.sol';

import '../node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol';
import '../node_modules/@openzeppelin/contracts/access/Ownable.sol';
import '../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol';
import '../node_modules/@openzeppelin/contracts/utils/Strings.sol';

import './Proxy.sol';
import './GenesisCart.sol';

contract CartERC1155 is ERC1155Supply, Ownable, Proxy {
  using SafeMath for uint256;
  using SafeMath for uint8;
  uint8 tokenCounter = 0;
  GenesisCart cartInstance;

  struct SoldMetaERC1155 {
    uint256 productId;
    uint256 tokenId;
    address owner;
  }

  mapping(uint256 => SoldMetaERC1155) private _soldProducts;
  event ProductBurned_cartArt1155(uint256 productId, address _ownerAddress);

  constructor(address _proxyAddr) public ERC1155('') {
    cartInstance = GenesisCart(_proxyAddr);
    setProxy(_proxyAddr);
  }

  function buy(
    address _to,
    uint256 _qty,
    uint256 _productId,
    string memory _data
  ) public onlyProxy {
    require(
      _qty > 0 && _qty <= 10,
      'You can buy no less than 1, and no more than at tehe sametime'
    );

    uint256 _counderId;

    if (_soldProducts[_productId].productId == _productId) {
      _counderId = _soldProducts[_productId].tokenId;
    } else {
      tokenCounter += 1;
      _counderId = tokenCounter;
    }

    _mint(_to, _counderId, _qty, '0x0');
    cartInstance.productSold(_counderId, _to, _productId, _data);
    SoldMetaERC1155 memory sold = SoldMetaERC1155(_productId, _counderId, _msgSender());
    _soldProducts[_productId] = sold;
  }

  function uri(uint256 _tokenId) public view override returns (string memory) {
    for (uint256 i = 0; i <= tokenCounter; i++) {
      if (_soldProducts[i].tokenId == _tokenId) {
        string memory _tokenURI = cartInstance.getMetaURI(_soldProducts[i].productId);
        return string(abi.encodePacked(_tokenURI, Strings.toString(_tokenId)));
      }
    }
  }

  function burn(
    address _owner,
    uint256 tokenId,
    uint256 _qty
  ) public {
    require(_ownerOf(tokenId));
    _burn(_owner, tokenId, _qty); // address account, uint256 id
    emit ProductBurned_cartArt1155(tokenId, _owner);
  }

  function _ownerOf(uint256 tokenId) internal view returns (bool) {
    return balanceOf(msg.sender, tokenId) != 0;
  }
}
