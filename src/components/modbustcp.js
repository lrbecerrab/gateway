const modbus = require("jsmodbus");
const net = require("net");

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
    host: "127.0.0.1",
    port: 502,
  };
  /*   console.log("Reading energy...Ctrl+C to stop");
  console.log("Meter address: ", meterAddress);
  console.log("ipAddress: ", ipAddress);
  console.log("Port: ", port);
  console.log("Modbus ID: ", modbusId);
  console.log("Delay: ", delay); */

  const client = new modbus.client.TCP(socket);

  let cycleDone = true;

  socket.on("connect", function () {
    setInterval(function () {
      if (!cycleDone) {
        return;
      }
      cycleDone = false;
      console.log("Econsumed, Eproduced");
      const fc03 = client.readHoldingRegisters(0, 2).then(function (resp) {
        console.log(resp.response._body.valuesAsArray);
        //console.log("Energy consumed = " + resp.response._body.valuesAsArray[0]);
        // console.log("Energy produced = " + resp.response._body.valuesAsArray[1]);
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
