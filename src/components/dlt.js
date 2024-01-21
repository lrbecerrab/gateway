const ethers = require("ethers");
const fs = require("fs");

const createContract = (
  signerpk,
  providerUrl,
  contractAddress,
  contractAbi
) => {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const signer = new ethers.Wallet(signerpk, provider);
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);
  return contract;
};

const sendTransaction = async (
  network,
  contract,
  meterAddress,
  _energyConsumed,
  _energyProduced
) => {
  try {
    initialTimeStamp = Date.now();
    const transaction = await contract.meterReport(
      meterAddress,
      _energyConsumed,
      _energyProduced,
      { gasLimit: 70000 }
    );
    console.log(
      `${initialTimeStamp} -> ${transaction.hash}- enviando transacción`
    );
    await transaction.wait();
    finalTimeStamp = Date.now();
    latency = finalTimeStamp - initialTimeStamp;
    console.log(`${finalTimeStamp} <- ${transaction.hash}-Transacción exitosa`);
    console.log(`Tiempo de respuesta: ${latency} ms`);
    let data = `${transaction.hash},${initialTimeStamp}, ${finalTimeStamp}, ${latency}\n`;
    fs.appendFile(`./${network}-${meterAddress}.csv`, data, (err) => {
      // In case of a error throw err.
      if (err) throw err;
    });
  } catch (error) {
    console.log(error);
  }
};

const getTransaction = async (providerUrl, transactionHash) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const transaction = await provider.getTransactionReceipt(transactionHash);
    return transaction;
  } catch (error) {
    console.log(error);
  }
};

const getMeasures = async (contract, meterAddress) => {
  try {
    const measures = await contract.meterMeasures(meterAddress);
    return measures;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createContract,
  sendTransaction,
  getTransaction,
  getMeasures,
};
