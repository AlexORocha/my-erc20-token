// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AlexToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("AlexToken", "MTK") {
        _mint(msg.sender, initialSupply);
    }
}