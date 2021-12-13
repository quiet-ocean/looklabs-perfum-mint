// CODER
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

// import 'hardhat/console.sol';
// import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
// import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol';
// import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol';

import '../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '../node_modules/@openzeppelin/contracts/access/Ownable.sol';
import '../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol';
import './Proxy.sol';
import './GenesisCart.sol';

contract addOnContract is ERC721Enumerable, Ownable, Proxy {
  using SafeMath for uint256;
  using SafeMath for uint8;
  address proxyAddr;

  struct SoldMeta {
    uint256 tokenId;
    uint256 productId;
  }

  GenesisCart cartInstance;

  mapping(uint256 => SoldMeta) private _soldProducts;

  event ProductSold_cartArt_coder(uint256 productId, address _ownerAddress);
  event ProductBurned_cartArt_coder(uint256 productId, address _ownerAddress);

  constructor(address _proxyAddr) public ERC721('Coder', 'LOOK LABS') {
    cartInstance = GenesisCart(_proxyAddr);
    setProxy(_proxyAddr);
  }

  uint8[] private units = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10
  ];

  uint8[] private multipliers = [
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0
  ];

  uint8[] private suffixes = [1, 2];

  function random(string memory input) internal pure returns (uint256) {
    return uint256(keccak256(abi.encodePacked(input)));
  }

  function getX(uint256 tokenId) public view returns (uint256) {
    return code(tokenId, '$X', units);
  }

  function getY(uint256 tokenId) public view returns (uint256) {
    return code(tokenId, '$Y', units);
  }

  function getZ(uint256 tokenId) public view returns (uint256) {
    return code(tokenId, '$Z', units);
  }

  function getC(uint256 tokenId) public view returns (uint256) {
    return code(tokenId, '$C', units);
  }

  function getO(uint256 tokenId) public view returns (uint256) {
    return code(tokenId, '$O', units);
  }

  function getR(uint256 tokenId) public view returns (uint256) {
    return code(tokenId, '$R', units);
  }

  function getI(uint256 tokenId) public view returns (uint256) {
    return code(tokenId, '$I', units);
  }

  function getP(uint256 tokenId) public view returns (uint256) {
    return code(tokenId, '$P', units);
  }

  function code(
    uint256 tokenId,
    string memory keyPrefix,
    uint8[] memory sourceArray
  ) internal view returns (uint256) {
    uint256 rand = random(string(abi.encodePacked(keyPrefix, toStr(tokenId))));
    uint256 output = sourceArray[rand % sourceArray.length];
    uint256 luck = rand % 21;
    if (luck > 14) {
      output += suffixes[rand % suffixes.length];
    }
    if (luck >= 19) {
      if (luck == 19) {
        output =
          (output * multipliers[rand % multipliers.length]) +
          suffixes[rand % suffixes.length];
      } else {
        output = (output * multipliers[rand % multipliers.length]);
      }
    }
    return output;
  }

  function tokenURI(uint256 _tokenId) public view override returns (string memory) {
    string[8] memory meta;

    uint256 productId = _soldProducts[_tokenId].productId;
    string memory _tokenURI = cartInstance.getMetaURI(productId);

    meta[0] = string(
      abi.encodePacked('{"trait_type": "X", "value": "', toStr(getX(_tokenId)), '"},')
    );
    meta[1] = string(
      abi.encodePacked('{"trait_type": "Y", "value": "', toStr(getY(_tokenId)), '"},')
    );
    meta[2] = string(
      abi.encodePacked('{"trait_type": "Z", "value": "', toStr(getZ(_tokenId)), '"},')
    );
    meta[3] = string(
      abi.encodePacked('{"trait_type": "C", "value": "', toStr(getC(_tokenId)), '"},')
    );
    meta[4] = string(
      abi.encodePacked('{"trait_type": "O", "value": "', toStr(getO(_tokenId)), '"},')
    );
    meta[5] = string(
      abi.encodePacked('{"trait_type": "R", "value": "', toStr(getR(_tokenId)), '"},')
    );
    meta[6] = string(
      abi.encodePacked('{"trait_type": "I", "value": "', toStr(getI(_tokenId)), '"},')
    );
    meta[7] = string(
      abi.encodePacked('{"trait_type": "P", "value": "', toStr(getP(_tokenId)), '"}')
    );

    string memory output = string(
      abi.encodePacked(meta[0], meta[1], meta[2], meta[3], meta[4], meta[5], meta[6], meta[7])
    );

    string memory json = Base64.encode(
      bytes(
        string(
          abi.encodePacked(
            '{"name": "$CODER #',
            toStr(_tokenId),
            '", "image": "',
            _tokenURI,
            '/i/',
            toStr(_tokenId),
            '", "animation_url": "',
            _tokenURI,
            '/a/',
            toStr(_tokenId),
            '", "description": "Coder Metapass.", "attributes": [',
            output,
            ']}'
          )
        )
      )
    );
    output = string(abi.encodePacked('data:application/json;base64,', json));

    return output;
  }

  function buy(
    address _to,
    uint256 _qty,
    uint256 _productId
  ) public onlyProxy {
    require(
      _qty > 0 && _qty <= 10,
      'You can buy no less than 1, and no more than 10 $CODER passes at a time'
    );

    for (uint256 i = 0; i < _qty; i++) {
      uint256 mintIndex = totalSupply() + 1;
      _mint(_to, mintIndex);
      emit ProductSold_cartArt_coder(mintIndex, _to);
      SoldMeta memory sold = SoldMeta(mintIndex, _productId);
      _setTokenMeta(mintIndex, sold);
    }
  }

  function toStr(uint256 value) internal pure returns (string memory) {
    // Inspired by OraclizeAPI's implementation - MIT license
    // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

    if (value == 0) {
      return '0';
    }
    uint256 temp = value;
    uint256 digits;
    while (temp != 0) {
      digits++;
      temp /= 10;
    }
    bytes memory buffer = new bytes(digits);
    while (value != 0) {
      digits -= 1;
      buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
      value /= 10;
    }
    return string(buffer);
  }

  function burnPass(uint256 _tokenId) external {
    require(ownerOf(_tokenId) == _msgSender());
    _burn(_tokenId);
    emit ProductBurned_cartArt_coder(_tokenId, _msgSender());
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

  function _setTokenMeta(uint256 _tokenId, SoldMeta memory _meta) private {
    _soldProducts[_tokenId] = _meta;
  }
}

/// [MIT License]
/// @title Base64
/// @notice Provides a function for encoding some bytes in base64
/// @author Brecht Devos <brecht@loopring.org>
library Base64 {
  bytes internal constant TABLE =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  /// @notice Encodes some bytes to the base64 representation
  function encode(bytes memory data) internal pure returns (string memory) {
    uint256 len = data.length;
    if (len == 0) return '';

    // multiply by 4/3 rounded up
    uint256 encodedLen = 4 * ((len + 2) / 3);

    // Add some extra buffer at the end
    bytes memory result = new bytes(encodedLen + 32);

    bytes memory table = TABLE;

    assembly {
      let tablePtr := add(table, 1)
      let resultPtr := add(result, 32)

      for {
        let i := 0
      } lt(i, len) {

      } {
        i := add(i, 3)
        let input := and(mload(add(data, i)), 0xffffff)

        let out := mload(add(tablePtr, and(shr(18, input), 0x3F)))
        out := shl(8, out)
        out := add(out, and(mload(add(tablePtr, and(shr(12, input), 0x3F))), 0xFF))
        out := shl(8, out)
        out := add(out, and(mload(add(tablePtr, and(shr(6, input), 0x3F))), 0xFF))
        out := shl(8, out)
        out := add(out, and(mload(add(tablePtr, and(input, 0x3F))), 0xFF))
        out := shl(224, out)

        mstore(resultPtr, out)

        resultPtr := add(resultPtr, 4)
      }

      switch mod(len, 3)
      case 1 {
        mstore(sub(resultPtr, 2), shl(240, 0x3d3d))
      }
      case 2 {
        mstore(sub(resultPtr, 1), shl(248, 0x3d))
      }

      mstore(result, encodedLen)
    }

    return string(result);
  }
}
