// contract/MyTokenV1.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./mPUNDIX.sol";
import "./mPURSE.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Liquidity is ReentrancyGuardUpgradeable, UUPSUpgradeable, OwnableUpgradeable{
    uint256 balance_;
    uint256 balance_mPURSE;
    ERC20Upgradeable token;
    ERC20Upgradeable token2;

    function initialize() initializer public {
        __ReentrancyGuard_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
        
    }
    function Deposit(address user, address AddPUNDIX, address AddPURSE) external {
        token = ERC20Upgradeable(AddPUNDIX);
        token2 = ERC20Upgradeable(AddPURSE);
        balance_ = token.balanceOf(user);
        require(token.balanceOf(user) <= token2.balanceOf(address(this)));

        token.transferFrom(user,address(this),balance_);
        
        token2.approve(user,balance_);
        token2.transfer(user,balance_);
    }

    function Withdraw(address user, address AddPUNDIX, address AddPURSE) external {
        token = ERC20Upgradeable(AddPUNDIX);
        token2 = ERC20Upgradeable(AddPURSE);

        balance_mPURSE = token2.balanceOf(user);

        require(token2.balanceOf(user) <= token.balanceOf(address(this)));
          
        token2.transferFrom(user,address(this),balance_mPURSE);

        // mPUNDIX(AddPUNDIX).mint(address(this), balance_mPURSE);
        token.approve(user,balance_mPURSE);

        token.transfer(user,balance_mPURSE); 
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}
}


