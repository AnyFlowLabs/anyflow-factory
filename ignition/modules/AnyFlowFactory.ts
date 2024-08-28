import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AnyFlowFactoryModule = buildModule("AnyFlowFactoryModule", (m) => {
  const factory = m.contract("AnyFlowFactory");

  return { factory };
});

export default AnyFlowFactoryModule;
