const ethereumJSON = require("./ethereumMicroGrid.json");
const ethereumAbi = ethereumJSON.abi;
const ethereumContractAddress = "0x3039F0C669296359A90aFcc54c2b82EFc5190417";
const ethereumProviderUrl =
  "https://eth-sepolia.g.alchemy.com/v2/lllJfVK-WoLtGdBK1XmBxzi0a1qfYm2y";

// Contrato Iota
const iotaJSON = require("./iotaMicroGrid.json");
const iotaAbi = iotaJSON.abi;
const iotaContractAddress = "0x30622aD85f0126508a1459db7c6A56F33514b61B";
const iotaProviderUrl = "https://json-rpc.evm.testnet.shimmer.network";

// Contrato Ethereum
const ALCHEMY_API_KEY = "lllJfVK-WoLtGdBK1XmBxzi0a1qfYm2y";
const signerPrivateKey =
  "03e12541082027e207b650e4b939576c6b204cebc5ba313e4cfa223b6c775913";

const DBENDPOINT =
  "energytransactevaluationdb.cuagigzqx6cc.us-east-1.rds.amazonaws.com";
const DATABASE = "evaluationdb";
const USER = "admin";
const WP = "6CEBb7b1d5c";
module.exports = {
  ethereumProviderUrl,
  ethereumContractAddress,
  ethereumAbi,
  iotaProviderUrl,
  iotaContractAddress,
  iotaAbi,
  signerPrivateKey,
  DBENDPOINT,
  DATABASE,
  USER,
};
