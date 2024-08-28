// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.24;

/*
                    __ _               
  __ _ _ __  _   _ / _| | _____      __
 / _` | '_ \| | | | |_| |/ _ \ \ /\ / /
| (_| | | | | |_| |  _| | (_) \ V  V / 
 \__,_|_| |_|\__, |_| |_|\___/ \_/\_/  
             |___/    
*/

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TestContract
 * @dev The TestContract contract is a factory contract for creating AnyFlow contracts.
 */
contract TestContract {
    function sayHi() public pure returns (string memory) {
        return "Hi";
    }
}
