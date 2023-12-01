const getEnergyConsumed = (nominalValue) => {
  return Math.random() * nominalValue;
};

const getEnergyProduced = (nominalValue) => {
  return Math.random() * nominalValue * 1.15;
};

const getVoltageValue = (nominalValue) => {
  return Math.random() * nominalValue;
};
const getCurrentValue = (nominalValue) => {
  return Math.random() * nominalValue;
};

const getPFValue = () => {
  return Math.random(1);
};

const getFrecuencyValue = (nominalValue) => {
  return Math.random() * nominalValue;
};

const getPowerValue = (current, voltage, pf) => {
  return current * voltage * pf;
};

module.exports = {
  getEnergyConsumed,
  getEnergyProduced,
  getVoltageValue,
  getCurrentValue,
  getPFValue,
  getFrecuencyValue,
  getPowerValue,
};
