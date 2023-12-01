const { contractInstance, sendTransaction } = require("./components/dlt");
const {
  ethereumProviderUrl,
  ethereumContractAddress,
  ethereumAbi,
  iotaProviderUrl,
  iotaContractAddress,
  iotaAbi,
} = require("./utils/constants");

// Variables de entorno
const ALCHEMY_API_KEY = "lllJfVK-WoLtGdBK1XmBxzi0a1qfYm2y";
const SEPOLIA_PRIVATE_KEY =
  "03e12541082027e207b650e4b939576c6b204cebc5ba313e4cfa223b6c775913";
const CONNECTION_TYPE = "TCP";
const METER_ID = "1";
const METER_TCP = "127.0.0.1";
const METER_PORT = "502";
const METER_ADDRESS = "0x93d5e4721C9387b17d0DD9Ac2Da7279062bFD0F9";
const METER_PK =
  "0x41b2148bd001f5142d13d62cb6c2700ea853e27c860196167adbc0cf39fc2749";

// Constantes

const contractEthereum = contractInstance(
  ethereumProviderUrl,
  ethereumContractAddress,
  ethereumAbi,
  METER_PK
);

const contractIota = contractInstance(
  iotaProviderUrl,
  iotaContractAddress,
  iotaAbi,
  METER_PK
);

// Enviar transacción a la red Ethereum

const sendTransactionEthereum = sendTransaction(contractEthereum, METER_ADDRESS, 10, 10);
