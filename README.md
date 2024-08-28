# AnyFlow Factory Contracts

This Hardhat project contains the smart contracts for the AnyFlow Factory. The factory is responsible for implementing advanced features for creating new contracts on the AnyFlow platform.

## How it works

The main contract is the `AnyFlowFactory.sol` contract. This contract is responsible for creating new contracts using the `CREATE2` opcode. The `CREATE2` opcode allows for the creation of a contract at a specific address based on the contract's bytecode and a salt value. The salt value is used to create a unique address for each contract created by the factory. 

## Deployment

To deploy this project, log into AnyFlow and follow the instructions.
