const ethers = require("ethers");

const createContract = async (
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
    if (!contract) throw new Error("No se ha podido obtener el contrato");
    const transaction = await contract.meterReport(
      meterAddress,
      _energyConsumed,
      _energyProduced
    );
    console.log(
      `Transaction - ${transaction.hash}, energy: ${_energyConsumed}, ${_energyProduced}`
    );
    await transaction.wait();
    console.log(`Transacción - ${transaction.hash} ejecutada`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createContract, sendTransaction };
