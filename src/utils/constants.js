// Contrato Ethereum

const ethereumJSON = require("./ethereumMicroGrid.json");
const ethereumContractAddress = "0xda164db46F0d900F65aC7f3bF2551b897e16A57d";
const ethereumAbi = ethereumJSON.abi;
const ethereumProviderUrl =


// Contrato Iota
const iotaJSON = require("./iotaMicroGrid.json");
const iotaContractAddress = "0x7B11c1D0f396589a33117C86AA82d66aa1C18888";
const iotaAbi = iotaJSON.abi;
const iotaProviderUrl = "https://json-rpc.evm.testnet.shimmer.network";

module.exports = {
  ethereumProviderUrl,
  ethereumContractAddress,
  ethereumAbi,
  iotaProviderUrl,
  iotaContractAddress,
  iotaAbi,
  signerPrivateKey,
};
