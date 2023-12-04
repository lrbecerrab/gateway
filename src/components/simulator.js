const { sendTransaction } = require("./dlt.js");

const getEnergy = (nominalValue) => {
  return Math.floor(Math.random() * nominalValue);
};

const simulateEnergy = (consumer, producer, _energy) => {
  let energy = [0, 0];
  if (consumer) energy[0] = _energy[0] + getEnergy(10);
  if (producer) energy[1] = _energy[1] + getEnergy(15);
  return energy;
};

module.exports = { simulateEnergy };
