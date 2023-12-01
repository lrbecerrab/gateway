

const reporting = async (_energyConsumed, _energyProduced) => {
  try {
    const mgContract = await createContract();
    const transactionHash = await mgContract.meterReport(
      meterAddress,
      _energyConsumed,
      _energyProduced
    );
    console.log(
      `Reportando Energía Consumida:${_energyConsumed} y Energía Producida:${_energyProduced}`
    );

    console.log(`Ejecutando transacción - ${transactionHash.hash}`);
    await transactionHash.wait();
    console.log(`Transacción - ${transactionHash.hash} ejecutada`);
    await transactionHash.wait();
  } catch (error) {
    console.log(error);
    throw new Error(
      "El contrato no existe por favor valide la dirección configurada"
    );
  }
};
module.exports = { reporting };