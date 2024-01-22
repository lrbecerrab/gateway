const { array } = require("yargs");
const { createContract, sendTransaction } = require("./components/dlt.js");
const { simulateEnergy } = require("./components/simulator.js");
const { reportTCP } = require("./components/modbustcp.js");
const { reportSerial } = require("./components/modbusserial.js");

const {
  ethereumProviderUrl,
  ethereumContractAddress,
  ethereumAbi,
  iotaProviderUrl,
  iotaContractAddress,
  iotaAbi,
} = require("./utils/constants");

var argv = require("yargs/yargs")(process.argv.slice(2))
  .usage("Usage: $0 simulated -a='0xffabc'--<options>")
  .usage("Usage: $0 real -a='0xffabc' tcp/serial --<options>")
  .describe("a", "the meter account in Ethereum or Iota")
  .describe("k", "signer Private Key")
  .describe("w", "db password")
  .describe("e", "network Ethereum-Sepolia")
  .describe("t", "network Iota-Shimmer")
  .describe("b", "serial baudrate")
  .describe("i", "ip Address")
  .describe("s", "serial port")
  .describe("p", "socket port")
  .describe("r", "producer")
  .describe("c", "consumer")
  .option("modbus Id", { alias: "m", describe: "modbus id", type: "number" })
  .example(
    "$0 simulated a='0xffabc' -e -<r/c>",
    "meter simulated with addres 0xffabc, type producer/consumer reporting to Sepolia"
  )
  .example(
    "$0 real a='0xffabc' -t serial -b 9600 -c COM1 -m 1",
    "real meter connection serial port COM1 baudrate 9600 modbus id 1 reporting to Shimmer"
  )
  .example(
    "$0 real tcp -i -e 192.168.1.1 -p 502 -m 1",
    "real meter connection tpc/ip port 502 modbus id 1 reporting to Sepolia"
  ).argv;

const type = argv._[0];
const comm = argv._[1];
const meterAddress = argv.a.toString(16);
const signerPrivateKey = argv.k.toString(16);
const dbPassword = argv.w.toString(16);
const baudrate = argv.b;
const serialPort = argv.s;
const ipAddress = argv.i;
const port = argv.p;
const modbusId = argv.m;
const producer = argv.r || false;
const consumer = argv.c || false;
const ethereumNetwork = argv.e || false;
const iotaNetwork = argv.t || false;
let providerUrl;
let contractAddress;
let abi;
let network;

if (ethereumNetwork) {
  providerUrl = ethereumProviderUrl;
  contractAddress = ethereumContractAddress;
  abi = ethereumAbi;
  network = "ethereum";
} else if (iotaNetwork) {
  providerUrl = iotaProviderUrl;
  contractAddress = iotaContractAddress;
  abi = iotaAbi;
  network = "iota";
}
const delay = 300000;

const reportingMeasures = new Promise(async (resolve, reject) => {
  const contract = await createContract(
    signerPrivateKey,
    providerUrl,
    contractAddress,
    abi
  );
  resolve(contract);
}).then((contract) => {
  const typeSource = new Promise(async (resolve, reject) => {
    if (type === "simulated") {
      const reportedEnergy = await simulateEnergy(
        network,
        contract,
        meterAddress,
        consumer,
        producer,
        delay,
        dbPassword
      );
    }
    if (type === "real") {
      if (comm === "serial") {
        console.log("meter real with serial communication");
        const reportedEnergy = await reportSerial(
          network,
          contract,
          meterAddress,
          serialPort,
          baudrate,
          modbusId,
          delay
        );
      } else if (comm === "tcp") {
        console.log("meter real with TCP/IP communication");
        const reportedEnergy = await reportTCP(
          network,
          contract,
          meterAddress,
          ipAddress,
          port,
          modbusId,
          delay
        );
      }
    }
    resolve(typeSource);
  }).catch((error) => {
    throw new Error(error);
  });
});
