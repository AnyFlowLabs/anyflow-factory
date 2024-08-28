import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import TestContractArtifact from "../artifacts/contracts/TestContract.sol/TestContract.json";
import { Address, Hex, keccak256 } from "viem";

describe("AnyFlowFactory.sol", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFactory() {
    const factory = await hre.viem.deployContract("AnyFlowFactory");
    const publicClient = await hre.viem.getPublicClient();

    return {
      factory,
      publicClient,
    };
  }

  describe("Factory Deployment", function () {
    it("Should deploy the contract", async function () {
      const { factory, publicClient } = await loadFixture(deployFactory);
      expect(await factory.address).to.be.a.properAddress;
      expect(await publicClient.getCode({ address: factory.address })).to.be.properHex;
      expect(await factory.read.version()).to.be.equal("v0.0.1");
    });
  });

  describe("Simple Deployment", function () {
    describe("Deployment", function () {
      it("Should return predicted address", async function () {
        const { factory } = await loadFixture(deployFactory);

        const salt = keccak256("0x1234")
        const bytecode = TestContractArtifact.bytecode as Hex
        const byteHash = keccak256(bytecode)

        const address = await factory.read.computeAddress([salt, byteHash])

        expect(address).to.be.a.properAddress
      });
      it("Should deploy TestContract", async function () {
        const { factory, publicClient } = await loadFixture(deployFactory);

        const amount = 0
        const salt = keccak256("0x1234")
        const bytecode = TestContractArtifact.bytecode as Hex

        const hash = await factory.write.deploy([amount, salt, bytecode])
        const receipt = await publicClient.waitForTransactionReceipt({ hash })
        const address = await factory.read.computeAddress([salt, keccak256(bytecode)]) as Address

        expect(publicClient.getCode({ address })).to.be.properHex
      });
    });

    describe("Events", function () {
      it("Should emit a ContractDeployed event on deployment", async function () {
        const { factory, publicClient } = await loadFixture(deployFactory);

        const amount = 0
        const salt = keccak256("0x1234")
        const bytecode = TestContractArtifact.bytecode as Hex

        expect(factory.write.deploy([amount, salt, bytecode]))
          .to.emit("AnyFlowFactory", "ContractDeployed")
      });
    });
  });
});
