const ethers = require("ethers");

const contractInstance = async (
  providerUrl,
  contractAddress,
  contractAbi,
  signerpk
) => {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const signer = new ethers.Wallet(signerpk, provider);
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);
  console.log(`Contrato:${contract.target} desplegado`);
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
    console.log(`Reportando a Sepolia con transacción  - ${transaction.hash}`);
    await transaction.wait();
    console.log(`Transacción - ${transaction.hash} ejecutada`);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Transacción finalizada");
  }; 
};

module.exports = { contractInstance, sendTransaction };
