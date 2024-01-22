const ethers = require("ethers");
const { saveRecord } = require("./recording.js");

const decimals = Math.pow(10, 18);

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
  _energyProduced,
  connection
) => {
  try {
    initialTimeStamp = Date.now();
    const transaction = await contract.meterReport(
      meterAddress,
      _energyConsumed,
      _energyProduced,
      { gasLimit: 2000000 }
    );
    console.log(
      `${initialTimeStamp} -> ${transaction.hash}- enviando transacción`
    );
    await transaction.wait();
    finalTimeStamp = Date.now();
    latency = finalTimeStamp - initialTimeStamp;
    console.log(`${finalTimeStamp} <- ${transaction.hash}-Transacción exitosa`);
    console.log(`Tiempo de respuesta: ${latency} ms`);
    let data = [
      network.toString(),
      contract.address.toString(),
      meterAddress.toString(),
      new Date(),
      transaction.hash.toString(),
      _energyConsumed,
      _energyProduced,
      initialTimeStamp.toString(),
      finalTimeStamp.toString(),
      latency,
    ];
    saveRecord(connection, data);
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
    let eConsumed =
      ethers.utils.formatEther(measures.energyConsumed) * decimals;
    let eProduced =
      ethers.utils.formatEther(measures.energyProduced) * decimals;
    return { eConsumed, eProduced };
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
