const { sendTransaction, getMeasures } = require("./dlt.js");
const fs = require("fs");

const getEnergy = (nominalValue) => {
  return Math.floor(Math.random() * nominalValue);
};

const simulateEnergy = async (
  network,
  providerUrl,
  contract,
  meterAddress,
  consumer,
  producer,
  delay
) => {
  try {
    startTime = new Date();

    let header = `Contrato ${contract.address}\nMedidor ${meterAddress}\nSimulación de reporte de energía en ${network} -> Empieza ${startTime} ...Ctrl + C para terminar la simulación\n`;
    fs.appendFile(`./data/${network}-${meterAddress}.csv`, header, (err) => {
      // In case of a error throw err.
      if (err) throw err;
    });
    fs.appendFile(
      `./data/${network}-${meterAddress}.csv`,
      "Transaction Hash, Initial Timestamp, Final TimeStamp, Execution time (ms)\n",
      (err) => {
        // In case of a error throw err.
        if (err) throw err;
      }
    );
    console.log(header);
    let measures = await getMeasures(contract, meterAddress);
    let energyConsumed = measures.energyConsumed;
    let energyProduced = measures.energyProduced;
    setInterval(
      async function () {
        if (consumer) energyConsumed += getEnergy(10);
        if (producer) energyProduced += getEnergy(15);
        console.log(
          "Energía consumida: " +
            energyConsumed +
            " Energía producida: " +
            energyProduced
        );
        const transaction = await sendTransaction(
          network,
          contract,
          meterAddress,
          energyConsumed,
          energyProduced
        );
      },
      delay,
      energyConsumed,
      energyProduced
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error en la simulación");
  }
};

module.exports = { simulateEnergy };
