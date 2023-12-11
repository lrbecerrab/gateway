const modbus = require("jsmodbus");
const SerialPort = require("serialport");

const net = require("net");
const { sendTransaction } = require("./dlt.js");

const reportTCP = (
  contract,
  meterAddress,
  serialPort, //"/dev/tty-usbserial1",
  baudrate,
  modbusId,
  delay
) => {
  const options = {
    baudRate: baudrate,
    serialPort: "dev/ttyUSB0",
  };

  /*   console.log("Reading energy...Ctrl+C to stop");
  console.log("Meter address: ", meterAddress);
  console.log("ipAddress: ", ipAddress);
  console.log("Port: ", port);
  console.log("Modbus ID: ", modbusId);
  console.log("Delay: ", delay); */

  const socket = new SerialPort("/dev/tty-usbserial1", options);
  const client = new Modbus.client.RTU(socket, modbusId);

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
