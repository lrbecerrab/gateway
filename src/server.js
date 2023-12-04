const { array } = require("yargs");
const { createContract, sendTransaction } = require("./components/dlt.js");
const { simulateEnergy } = require("./components/simulator.js");

const {
  ethereumProviderUrl,
  ethereumContractAddress,
  ethereumAbi,
  iotaProviderUrl,
  iotaContractAddress,
  iotaAbi,
  signerPrivateKey,
} = require("./utils/constants");

var argv = require("yargs/yargs")(process.argv.slice(2))
  .usage("Usage: $0 simulated -a='0xffabc'--<options>")
  .usage("Usage: $0 real -a='0xffabc' tcp/serial --<options>")
  .describe("a", "the meter account in Ethereum or Iota")
  .describe("e", "network Ethereum-Sepolia")
  .describe("t", "network Iota-Shimmer")
  .describe("b", "serial baudrate")
  .describe("i", "ip Address")
  .describe("s", "serial port")
  .describe("p", "socket port")
  .describe("m", "modbus id")
  .describe("r", "producer")
  .describe("c", "consumer")
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
const baudrate = argv.b;
const serialPort = argv.s;
const ipAddress = argv.i;
const port = argv.p;
const modbusId = argv.m;
const producer = argv.r || false;
const consumer = argv.c || false;
const ethereumNetwork = argv.e || false;
const iotaNetwork = argv.t || false;

console.log(`You have selected a ${type} meter with address ${meterAddress}`);

let providerUrl;
let contractAddress;
let abi;

if (ethereumNetwork) {
  providerUrl = ethereumProviderUrl;
  contractAddress = ethereumContractAddress;
  abi = ethereumAbi;
} else if (iotaNetwork) {
  providerUrl = iotaProviderUrl;
  contractAddress = iotaContractAddress;
  abi = iotaAbi;
}
const delay = 20000;

const contract = createContract(
  signerPrivateKey,
  providerUrl,
  contractAddress,
  abi
);

console.log("Reporting energy...Ctrl+C to stop");
let energy = [0, 0];
setInterval(
  () => {
    const energyMeasures = new Promise((resolve, reject) => {
      if (type === "simulated") {
        const reportedEnergy = simulateEnergy(consumer, producer, energy);
        energy[0] = reportedEnergy[0];
        energy[1] = reportedEnergy[1];
      }
      if (type === "real") {
        if (comm === "serial") {
          const { reportSerial } = require("./components/modbustcp.js");
          reportSerial(
            contractInstance,
            meterAddress,
            baudrate,
            serialPort,
            modbusId,
            consumer,
            producer
          );
        } else if (comm === "tcp") {
          const { reportTCP } = require("./components/modbustcp.js");
          reportTCP(
            contractInstance,
            meterAddress,
            ipAddress,
            port,
            modbusId,
            consumer,
            producer
          );
        }
      }
      resolve(energy);
    })
      .then(async (energy) => {
        const transaction = new Promise(async (resolve, reject) => {
          const tx = await sendTransaction(
            contract,
            meterAddress,
            energy[0],
            energy[1]
          );
          resolve(tx);
        }).then(async (tx) => {
          console.log(`Transacción - ${tx.hash} ok`);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  delay,
  energy
);
