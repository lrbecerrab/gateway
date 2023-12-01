const { contractInstance, sendTransaction } = require("./components/dlt");
const {
  ethereumProviderUrl,
  ethereumContractAddress,
  ethereumAbi,
  iotaProviderUrl,
  iotaContractAddress,
  iotaAbi,
} = require("./utils/constants");



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
