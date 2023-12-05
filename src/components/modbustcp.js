const modbus = require("jsmodbus");
const net = require("net");
const { sendTransaction } = require("./dlt.js");

const reportTCP = (
  contract,
  meterAddress,
  ipAddress,
  port,
  modbusId,
  delay
) => {
  const socket = new net.Socket();
  const options = {
    host: ipAddress,
    port: port,
  };
  /*   console.log("Reading energy...Ctrl+C to stop");
  console.log("Meter address: ", meterAddress);
  console.log("ipAddress: ", ipAddress);
  console.log("Port: ", port);
  console.log("Modbus ID: ", modbusId);
  console.log("Delay: ", delay); */

  const client = new modbus.client.TCP(socket, modbusId);

  let cycleDone = true;

  socket.on("connect", function () {
    setInterval(function () {
      if (!cycleDone) {
        return;
      }
      cycleDone = false;
      const fc03 = client.readHoldingRegisters(0, 2).then(function (resp) {
        //        console.log(resp.response._body.valuesAsArray);
        const energyConsumed = resp.response._body.valuesAsArray[0];
        const energyProduced = resp.response._body.valuesAsArray[1];
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
      }, console.error);
      const allFcs = Promise.all([fc03]);
      allFcs.then(function () {
        cycleDone = true;
      }, socket.close);
    }, delay);
  });

  socket.on("error", console.error);
  socket.connect(options);
};

module.exports = { reportTCP };
