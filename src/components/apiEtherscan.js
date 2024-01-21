const axios = require("axios");
const { ethers } = require("ethers");

const {
  ethereumContractAddress,
  iotaContractAddress,
  apiKeyEtherScan,
  apiKeyIotaScan,
} = require("../utils/constants");
const url =
  "https://api.etherscan.io/api?module=contract&action=getabi&address=" +
  ethereumContractAddress +
  "&apikey=" +
  apiKeyEtherScan;

const getTxInformation = async (hash) => {
  const res = await axios.get(url);
  const abi = JSON.parse(res.data.result);
  console.log(abi);
};

module.exports = { getTxInformation };
