const ethers = require("ethers");

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
  contract,
  meterAddress,
  _energyConsumed,
  _energyProduced
) => {
  try {
    const transaction = await contract.meterReport(
      meterAddress,
      _energyConsumed,
      _energyProduced
    );
    console.log(
      `Transacción - ${transaction.hash}, energyConsumed: ${_energyConsumed}, energyProduced: ${_energyProduced}`
    );
    return transaction;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createContract, sendTransaction };
