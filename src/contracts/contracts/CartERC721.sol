// CYBER
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

// import 'hardhat/console.sol';
// import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
// import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol';
// import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Strings.sol';
// import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol';

import '../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '../node_modules/@openzeppelin/contracts/access/Ownable.sol';
import '../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol';
import '../node_modules/@openzeppelin/contracts/utils/Strings.sol';

import './Proxy.sol';
import './GenesisCart.sol';

contract CartERC721 is ERC721Enumerable, Ownable, Proxy {
  using SafeMath for uint256;
  using SafeMath for uint8;

  GenesisCart cartInstance;

  struct SoldMetaERC721 {
    uint256 tokenId;
    uint256 productId;
  }

  mapping(uint256 => SoldMetaERC721) private _soldProducts;

  event ProductBurned_cartArt721(uint256 productId, address _ownerAddress);

  constructor(address _proxyAddr) public ERC721('cart.art ERC721', 'LOOK LABS') {
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
    for (uint256 i = 0; i < _qty; i++) {
      uint256 mintIndex = totalSupply() + 1;
      SoldMetaERC721 memory sold = SoldMetaERC721(mintIndex, _productId);
      _mint(_to, mintIndex);
      cartInstance.productSold(mintIndex, _to, _productId, _data);
      _setTokenMeta(mintIndex, sold);
    }
  }

  function burn(uint256 _tokenId) external {
    require(ownerOf(_tokenId) == _msgSender());
    emit ProductBurned_cartArt721(_tokenId, _msgSender());
    _burn(_tokenId);
  }

  function tokenURI(uint256 _tokenId) public view override returns (string memory) {
    uint256 productId = _soldProducts[_tokenId].productId;
    string memory _tokenURI = cartInstance.getMetaURI(productId);
    return string(abi.encodePacked(_tokenURI, Strings.toString(_tokenId)));
  }

  function _setTokenMeta(uint256 _tokenId, SoldMetaERC721 memory _meta) private {
    _soldProducts[_tokenId] = _meta;
  }

  function tokensOfOwner(address _owner) external view returns (uint256[] memory) {
    uint256 tokenCount = balanceOf(_owner);
    if (tokenCount == 0) {
      return new uint256[](0);
    } else {
      uint256[] memory result = new uint256[](tokenCount);
      uint256 index;
      for (index = 0; index < tokenCount; index++) {
        result[index] = tokenOfOwnerByIndex(_owner, index);
      }
      return result;
    }
  }
}
