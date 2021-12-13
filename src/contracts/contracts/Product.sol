// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

// import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol';
// import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol';
// import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol';
// import 'hardhat/console.sol';

import '../node_modules/@openzeppelin/contracts/access/Ownable.sol';
import '../node_modules/@openzeppelin/contracts/utils/Counters.sol';
import '../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol';

contract Product is Ownable {
  using Counters for Counters.Counter;
  using SafeMath for uint256;
  using SafeMath for uint8;

  // here product struct

  mapping(uint256 => Product) public products;
  Counters.Counter private _productIds;

  struct Product {
    uint256 id;
    string name;
    uint256 price;
    uint8 qty;
    uint256 contractType;
    uint256 category;
    bool sale;
    string url;
  }

  struct DiscountProduct {
    uint256 product;
    bool valid;
    uint256 amount;
  }

  struct DiscountGroup {
    uint256[] productIds;
    bool valid;
    uint256 amount;
  }

  DiscountGroup public discountGroup;
  mapping(uint256 => DiscountProduct) public discountedProducts;

  event NewProduct(uint256 productId);
  event ProductUpdated(uint256 productId);
  event DeleteProduct(uint256 productId);
  event SoldOut(uint256 productId);
  event BackInStock(uint256 productId);
  event NewPrice(uint256 productId);

  function addProduct(
    string memory _name,
    uint256 _price,
    uint8 _qty,
    uint256 _contractType,
    uint256 _category,
    bool _onSale,
    string memory _url
  ) public onlyOwner checkProductValidity(_price, _qty) returns (bool success) {
    uint256 newItemId = _productIds.current();
    Product memory product = Product(
      newItemId,
      _name,
      _price,
      _qty,
      _contractType,
      _category,
      _onSale,
      _url
    );
    products[newItemId] = product;
    emit NewProduct(newItemId);
    _productIds.increment();
    return true;
  }

  function deleteProduct(uint256 _id) public onlyOwner returns (bool success) {
    Product memory product = products[_id];
    if (product.id == _id) {
      delete products[_id];
      emit DeleteProduct(_id);
      return true;
    }
    return false;
  }

  function updateProduct(
    uint256 _id,
    string memory _name,
    uint256 _price,
    uint8 _qty,
    uint256 _contractType,
    uint256 _cateogry,
    bool _onSale,
    string memory _url
  ) public onlyOwner checkProductValidity(_price, _qty) returns (bool success) {
    Product memory product = Product(
      _id,
      _name,
      _price,
      _qty,
      _contractType,
      _cateogry,
      _onSale,
      _url
    );
    products[_id] = product;
    emit ProductUpdated(_id);
    return true;
  }

  function updateStock(uint256 _id, uint8 _qty) public onlyOwner returns (bool success) {
    require(_qty > 0, 'Invalid QTY');
    products[_id].qty = _qty;
    emit BackInStock(_id);
    return true;
  }

  function updatePrice(uint256 _id, uint8 _price) public onlyOwner returns (bool success) {
    require(_price > 0, 'Invalid Price');
    products[_id].price = _price;
    emit NewPrice(_id);
    return true;
  }

  function getProducts() public view virtual returns (Product[] memory) {
    Product[] memory allProducts = new Product[](_productIds.current());
    // console.log('getProducts with _productIds.current()', _productIds.current());

    uint256 counter = 0;

    for (uint256 i = 0; i < _productIds.current(); i++) {
      allProducts[counter] = products[i];
      counter++;
    }
    return allProducts;
  }

  function setDiscountProduct(
    uint256 _productId,
    bool _enabled,
    uint256 _discountAmount
  ) public onlyOwner {
    DiscountProduct memory discount = DiscountProduct(_productId, _enabled, _discountAmount);
    discountedProducts[_productId] = discount;
  }

  function setDiscountGroup(
    uint256[] memory _productIds,
    bool _enabled,
    uint256 _discountAmount
  ) public onlyOwner {
    DiscountGroup memory dg = DiscountGroup(_productIds, _enabled, _discountAmount);
    discountGroup = dg;
  }

  modifier checkProductValidity(uint256 _price, uint256 _qty) {
    require(_price > 0 && _qty > 0, 'Invalid product');
    _;
  }
}
