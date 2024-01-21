// Contrato Ethereum
const ALCHEMY_API_KEY = "lllJfVK-WoLtGdBK1XmBxzi0a1qfYm2y";
const signerPrivateKey =
  "03e12541082027e207b650e4b939576c6b204cebc5ba313e4cfa223b6c775913";
const ethereumJSON = require("./ethereumMicroGrid.json");
const ethereumContractAddress = "0xda164db46F0d900F65aC7f3bF2551b897e16A57d";
const ethereumAbi = ethereumJSON.abi;
const ethereumProviderUrl =
  "https://eth-sepolia.g.alchemy.com/v2/lllJfVK-WoLtGdBK1XmBxzi0a1qfYm2y";

// Contrato Iota
const iotaJSON = require("./iotaMicroGrid.json");
const iotaContractAddress = "0x7B11c1D0f396589a33117C86AA82d66aa1C18888";
const iotaAbi = iotaJSON.abi;
const iotaProviderUrl = "https://json-rpc.evm.testnet.shimmer.network";

const apiKeyEtherScan = "U533XNVJCJ5T8MIFEXSRUHQHA3MX82FNKY";
const apiKeyIotaScan = "108f1e88-a873-470f-a550-91ee20cac5a9";

module.exports = {
  ethereumProviderUrl,
  ethereumContractAddress,
  ethereumAbi,
  iotaProviderUrl,
  iotaContractAddress,
  iotaAbi,
  signerPrivateKey,
  apiKeyEtherScan,
  apiKeyIotaScan,
};
