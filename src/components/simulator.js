const { sendTransaction } = require("./dlt.js");

const getEnergy = (nominalValue) => {
  return Math.floor(Math.random() * nominalValue);
};

const simulateEnergy = (consumer, producer) => {
  let energy = [0, 0];
  if (consumer) energy[0] += getEnergy(5);
  if (producer) energy[1] += getEnergy(8);
  return energy;
};

module.exports = { simulateEnergy };
