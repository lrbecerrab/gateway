const ethers = require("ethers");

const createContract = async (
  name,
  providerUrl,
  contractAddress,
  contractAbi,
  signerpk
) => {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const signer = new ethers.Wallet(signerpk, provider);
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);
  console.log(`Contrato ${name}: ${contract.address} desplegado`);
  return contract;
};

const sendTransaction = async (
  name,
  providerUrlroviderUrl,
  contractAddress,
  contractAbi,
  meterAddress,
  meterPK,
  _energyConsumed,
  _energyProduced
) => {
  try {
    const contract = createContract(
      name,
      providerUrlroviderUrl,
      contractAddress,
      contractAbi,
      meterAddress,
      meterPK
    );
    if (!contract) throw new Error("No se ha podido obtener el contrato");
    const transaction = contract.meterReport(
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
  }
};

module.exports = { sendTransaction };
