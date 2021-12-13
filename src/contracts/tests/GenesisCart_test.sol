// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

// This import is automatically injected by Remix
import 'remix_tests.sol';

// This import is required to use custom transaction context
// Although it may fail compilation in 'Solidity Compiler' plugin
// But it will work fine in 'Solidity Unit Testing' plugin
import 'contracts/GenesisCart.sol';

// <import file to test>

// File name has to end with '_test.sol', this file can contain more than one testSuite contracts
contract CartArtTests {
  GenesisCart gc;
  uint256[] productGroup1 = [0, 1, 2, 3];
  uint256[] productGroup2 = [0, 1, 2];
  uint256[] productGroup3 = [4, 5, 6, 7];
  uint256[] productQty1 = [1, 1, 1, 1];
  uint256[] productQty2 = [2, 2, 2, 2];
  uint256[] productQty3 = [2, 2, 2, 1];
  uint256[] productQty4 = [1, 1, 1, 2];
  uint256[] productQty5 = [1, 1, 1];

  /// 'beforeAll' runs before all other tests
  /// More special functions are: 'beforeEach', 'beforeAll', 'afterEach' & 'afterAll'
  function beforeAll() public {
    gc = new GenesisCart();
    // S01Drop
    gc.addProduct(
      'Cyber EDP',
      1000000000000000000,
      100,
      1,
      1,
      true,
      'https://elite.looklabs.xyz/cyber/'
    );
    gc.addProduct(
      'Hoodie',
      2000000000000000000,
      100,
      2,
      2,
      true,
      'https://elite.looklabs.xyz/hoodie/'
    );
    gc.addProduct(
      'eight.pass',
      3000000000000000000,
      100,
      3,
      3,
      true,
      'https://elite.looklabs.xyz/eight/'
    );
    gc.addProduct(
      'coder.art',
      4000000000000000000,
      100,
      3,
      3,
      true,
      'https://elite.looklabs.xyz/coder/'
    );
    // S02Drop
    gc.addProduct(
      'Dope Product 1',
      1500000000000000000,
      100,
      1,
      1,
      true,
      'https://elite.looklabs.xyz/dope/'
    );
    gc.addProduct(
      'Dope Product 2',
      2500000000000000000,
      100,
      1,
      1,
      true,
      'https://elite.looklabs.xyz/dope/'
    );
    gc.addProduct(
      'Dope Product 3',
      3500000000000000000,
      100,
      1,
      1,
      true,
      'https://elite.looklabs.xyz/dope/'
    );
    gc.addProduct(
      'Dope Product 4',
      4500000000000000000,
      100,
      1,
      1,
      true,
      'https://elite.looklabs.xyz/dope/'
    );

    gc.setDiscountGroup(productGroup1, true, 1000000000000000000);
  }

  function testGetProducts() public {
    Assert.equal(gc.getProducts()[0].name, 'Cyber EDP', 'No such product');
    Assert.equal(gc.getProducts()[1].name, 'Hoodie', 'No such product');
    Assert.equal(gc.getProducts()[2].name, 'eight.pass', 'No such product');
    Assert.equal(gc.getProducts()[3].name, 'coder.art', 'No such product');
    Assert.equal(gc.getProducts()[4].name, 'Dope Product 1', 'No such product');
    Assert.equal(gc.getProducts()[5].name, 'Dope Product 2', 'No such product');
    Assert.equal(gc.getProducts()[6].name, 'Dope Product 3', 'No such product');
    Assert.equal(gc.getProducts()[7].name, 'Dope Product 4', 'No such product');
  }

  // #sender: account-1
  // #value: 100

  function calculateDiscount() public payable {
    // 4 products, productQty1 = [1,1,1,1]
    Assert.equal(
      gc.calculatePrice(productGroup1, productQty1),
      9000000000000000000,
      'Expected 9000000000000000000'
    );
    // 4 products, productQty2 = [2,2,2,2];
    Assert.equal(
      gc.calculatePrice(productGroup1, productQty2),
      18000000000000000000,
      'Expected 18000000000000000000'
    );
    // 4 products, productQty3 = [2,2,2,1]
    Assert.equal(
      gc.calculatePrice(productGroup1, productQty3),
      15000000000000000000,
      'Expected 15000000000000000000'
    );
    // 4 products, productQty4 = [1,1,1,2]
    Assert.equal(
      gc.calculatePrice(productGroup1, productQty4),
      13000000000000000000,
      'Expected 13000000000000000000'
    );
    // 3 product productGroup2 = [0,1,2], productQty4 = [1,1,1]
    Assert.equal(
      gc.calculatePrice(productGroup2, productQty5),
      6000000000000000000,
      'Expected 6000000000000000000'
    );
  }

  function calculateExtraProduct() public payable {
    Assert.equal(
      gc.calculatePrice(productGroup3, productQty1),
      12000000000000000000,
      'Expected 12000000000000000000'
    );
  }

  // function checkSuccess() public {
  //     // Use 'Assert' methods: https://remix-ide.readthedocs.io/en/latest/assert_library.html
  //     Assert.ok(2 == 2, 'should be true');
  //     Assert.greaterThan(uint(2), uint(1), "2 should be greater than to 1");
  //     Assert.lesserThan(uint(2), uint(3), "2 should be lesser than to 3");
  // }

  // function checkFailure() public {
  //     Assert.notEqual(uint(1), uint(1), "1 should not be equal to 1");
  // }

  /// Custom Transaction Context: https://remix-ide.readthedocs.io/en/latest/unittesting.html#customization
  /// #sender: account-1
  /// #value: 100
  // function checkSenderAndValue() public payable {
  //     // account index varies 0-9, value is in wei
  //     Assert.equal(msg.sender, TestsAccounts.getAccount(1), "Invalid sender");
  //     Assert.equal(msg.value, 100, "Invalid value");
  // }
}
