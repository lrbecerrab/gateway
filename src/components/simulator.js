const { sendTransaction } = require("./dlt.js");

const getEnergy = (nominalValue) => {
  return Math.floor(Math.random() * nominalValue);
};

const simulateEnergy = (contract, meterAddress, consumer, producer, delay) => {
  let energyConsumed = 0;
  let energyProduced = 0;
  console.log("Simulating energy...Ctrl+C to stop");
  setInterval(
    function () {
      if (consumer) energyConsumed += getEnergy(10);
      if (producer) energyProduced += getEnergy(15);
      console.log(
        "Consumed: " + energyConsumed + " Produced: " + energyProduced
      );

      const transaction = new Promise((resolve, reject) => {
        resolve(
          sendTransaction(
            contract,
            meterAddress,
            energyConsumed,
            energyProduced
          )
        );
      })
        .then((transaction) => {
          console.log(`Transacción - ${transaction.hash} ok`);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    delay,
    energyConsumed,
    energyProduced
  );
};

module.exports = { simulateEnergy };
