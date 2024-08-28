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

import "@openzeppelin/contracts/utils/Create2.sol";

/**
 * @title AnyFlowFactory
 * @dev The AnyFlowFactory contract is a factory contract for creating AnyFlow contracts.
 */
contract AnyFlowFactory {
    string public constant version = "v0.0.1";

    /// @dev Emitted when a proxy is deployed.
    event ContractDeployed(
        address indexed deployer,
        address proxy,
        bytes32 salt
    );

    function deploy(
        uint256 amount,
        bytes32 salt,
        bytes memory bytecode
    ) public returns (address) {
        address addr = Create2.deploy(amount, salt, bytecode);
        emit ContractDeployed(msg.sender, addr, salt);
        return addr;
    }

    function computeAddress(
        bytes32 salt,
        bytes32 bytecodeHash
    ) public view returns (address) {
        return computeAddress(salt, bytecodeHash, msg.sender);
    }

    function computeAddress(
        bytes32 salt,
        bytes32 bytecodeHash,
        address deployer
    ) public pure returns (address) {
        return Create2.computeAddress(salt, bytecodeHash, deployer);
    }
}
