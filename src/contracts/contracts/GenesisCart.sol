// CYBER
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

// import 'hardhat/console.sol';
// import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol';
// import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol';

import '../node_modules/@openzeppelin/contracts/access/Ownable.sol';
import '../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol';

import './Helper.sol';
import './Product.sol';
import './CartERC721.sol';
import './CartERC1155.sol';
import './addOnContract.sol';

contract GenesisCart is Ownable, Product, Proxy {
  using Helper for uint256[];
  using SafeMath for uint256;
  using SafeMath for uint8;
  CartERC721 instanceERC721;
  CartERC1155 instanceERC1155;
  addOnContract instanceAddOnContract;

  address public vault;

  constructor() {
    instanceERC721 = new CartERC721(address(this));
    instanceERC1155 = new CartERC1155(address(this));
    instanceAddOnContract = new addOnContract(address(this));
    _approveChildContract(address(instanceERC721));
    _approveChildContract(address(instanceERC1155));
    _approveChildContract(address(instanceAddOnContract));
  }

  function checkOut(uint256[] memory _products, uint256[] memory _qty, string[] memory _data) public payable {
    require(msg.value >= calculatePrice(_products, _qty), 'Not enough balance');

    for (uint256 i = 0; i < _products.length; i++) {
      uint256 _productQTY = _qty[i];
      uint256 _productId = _products[i];
      string memory _productData = _data[i];

      if (products[_productId].contractType == 1) {
        instanceERC721.buy(msg.sender, _productQTY, _productId, _productData);
      } else if (products[_productId].contractType == 2) {
        instanceERC1155.buy(msg.sender, _productQTY, _productId, _productData); // hoodie & fashion
      } else {
        instanceAddOnContract.buy(msg.sender, _productQTY, _productId, _productData); // mint coder pass
      }
    }
  }

  // TODO to make private function

  function calculatePrice(uint256[] memory _products, uint256[] memory _qty)
    public
    view
    virtual
    returns (uint256 price)
  {
    uint256 _price;

    for (uint256 i = 0; i < _products.length; i++) {
      uint256 _product = _products[i];
      uint256 _productQTY = _qty[i];
      require(_products.length == _qty.length, 'Not valid qty for each product');
      require(_productQTY > 0 && _productQTY <= 10, "Can't buy 0 products or mint more than 10");
      require(products[_product].id == _product, 'No such product ID');
      require(products[_product].qty > 0, 'Not valid qty for each product');

      _price = _price.add(products[_product].price.mul(_productQTY));

      if (discountedProducts[_product].valid == true) {
        _price = _price.sub(discountedProducts[_product].amount.mul(_productQTY));
      }
    }

    if (
      keccak256(abi.encodePacked(discountGroup.productIds)) ==
      keccak256(abi.encodePacked(_products.sort()))
    ) {
      uint256[] memory discountPack = _qty.sort();
      _price = _price.sub(discountGroup.amount.mul(discountPack[0]));
    }

    return _price;
  }

  /*
   * Only GenesisFactory owner can run
   */

  function productSold(
    uint256 _tokenId,
    address _ownerAddress,
    uint256 _productId,
    string memory _data
  ) public onlyChildren {
    emit ProductSold(
      _productId,
      _tokenId,
      _ownerAddress,
      products[_productId].name,
      products[_productId].qty,
      _data
    );
    products[_productId].qty = products[_productId].qty - 1;
    if (products[_productId].qty == 0) {
      emit SoldOut(_productId);
    }
  }

  function setVault(address _newVaultAddress) public onlyOwner {
    vault = _newVaultAddress;
  }

  function withdraw(uint256 _amount) public onlyOwner {
    require(address(vault) != address(0), 'no vault');
    require(payable(vault).send(_amount), "didn't withraw");
  }

  function withdrawAll() public payable onlyOwner {
    require(address(vault) != address(0), 'no vault');
    require(payable(vault).send(address(this).balance), "didn't withdraw all");
  }

  function getMetaURI(uint256 _id) public view returns (string memory _name) {
    return products[_id].url;
  }
}
