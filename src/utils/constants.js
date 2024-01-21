const ethereumJSON = require("./ethereumMicroGrid.json");
const ethereumAbi = ethereumJSON.abi;
const ethereumContractAddress = "0xda164db46F0d900F65aC7f3bF2551b897e16A57d";
const ethereumProviderUrl =
  "https://eth-sepolia.g.alchemy.com/v2/lllJfVK-WoLtGdBK1XmBxzi0a1qfYm2y";

// Contrato Iota
const iotaJSON = require("./iotaMicroGrid.json");
const iotaAbi = iotaJSON.abi;
const iotaContractAddress = "0x7B11c1D0f396589a33117C86AA82d66aa1C18888";
const iotaProviderUrl = "https://json-rpc.evm.testnet.shimmer.network";

// Contrato Ethereum
const ALCHEMY_API_KEY = "lllJfVK-WoLtGdBK1XmBxzi0a1qfYm2y";
const signerPrivateKey =
  "03e12541082027e207b650e4b939576c6b204cebc5ba313e4cfa223b6c775913";

module.exports = {
  ethereumProviderUrl,
  ethereumContractAddress,
  ethereumAbi,
  iotaProviderUrl,
  iotaContractAddress,
  iotaAbi,
  signerPrivateKey,
};
