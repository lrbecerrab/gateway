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
  const options = {
    host: "127.0.0.1",
    port: 502,
  };

  const socket = new net.Socket();

  const client = new modbus.client.TCP(socket);
  let cycleDone = true;

  socket.on("Conexión", function () {
    setInterval(function () {
      if (!cycleDone) {
        return;
      }
      cycleDone = false;
      console.log("E+, E-");
      const fc03 = client.readHoldingRegisters(0, 2).then(function (resp) {
        console.log(resp.response._body.valuesAsArray);
        report(
          "",
          resp.response._body.valuesAsArray[0],
          resp.response._body.valuesAsArray[1]
        );
      }, console.error);
      const allFcs = Promise.all([fc03]);
      allFcs.then(function () {
        cycleDone = true;
      }, socket.close);
    }, 5000);
  });

  socket.on("error", console.error);
  socket.connect(options);
};

module.exports = { reportTCP };
