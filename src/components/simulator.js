const { sendTransaction, getMeasures } = require("./dlt.js");

const getEnergy = (nominalValue) => {
  return Math.floor(Math.random() * nominalValue);
};

const simulateEnergy = async (
  network,
  contract,
  meterAddress,
  consumer,
  producer,
  delay
) => {
  try {
    let header = `Contrato ${
      contract.address
    }\nMedidor ${meterAddress}\nSimulación de reporte de energía en ${network} -> Empieza ${new Date()} ...Ctrl + C para terminar la simulación\n`;
    console.log(header);
    setInterval(async function () {
      let measures = await getMeasures(contract, meterAddress);
      console.log("measures: ", measures);
      let energyConsumed = measures.eConsumed;
      let energyProduced = measures.eProduced;
      if (consumer) energyConsumed += getEnergy(10);
      if (producer) energyProduced += getEnergy(15);
      console.log("energyConsumed: ", energyConsumed);
      console.log("energyProduced: ", energyProduced);
      const transaction = await sendTransaction(
        network,
        contract,
        meterAddress,
        energyConsumed,
        energyProduced
      );
    }, delay);
  } catch (error) {
    console.log(error);
    throw new Error("Error en la simulación");
  }
};

module.exports = { simulateEnergy };
