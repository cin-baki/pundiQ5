// contract/MyTokenV1.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract mPURSE is Initializable, ERC20Upgradeable, UUPSUpgradeable, OwnableUpgradeable {
    function initialize() initializer public {
      __ERC20_init("mPURSE", "mPURSE");
      __Ownable_init();
      __UUPSUpgradeable_init();

      _mint(msg.sender, 1000 * 10 ** decimals());
    }

    function mint(address _beneficiary, uint256 amount) external returns (uint256) {
    	_mint(_beneficiary, amount);
    }


    function _authorizeUpgrade(address) internal override onlyOwner {}
}