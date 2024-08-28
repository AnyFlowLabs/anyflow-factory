import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import AnyFlowFactoryModule from "./AnyFlowFactory";
import { Hex, keccak256 } from "viem";
import TestContractArtifact from "../../artifacts/contracts/TestContract.sol/TestContract.json";

const TestContractModule = buildModule("TestContractModule", (m) => {
  const { factory } = m.useModule(AnyFlowFactoryModule);

  const amount = 0
  const salt = keccak256('0x1234')
  const bytecode = TestContractArtifact.bytecode as Hex

  const tx = m.call(factory, 'deploy', [amount, salt, bytecode])

  return { tx };
});

export default TestContractModule;
