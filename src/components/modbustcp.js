const modbus = require("jsmodbus");

const net = require("net");

const reporting = (ipAddress, port, modbusId, delay,_energy) => {
  const options = {
    host: ipAddress,
    port: port,
  };
  const socket = new net.Socket();
  const client = new modbus.client.TCP(socket, modbusId);
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
        _energy[0] = resp.response._body.valuesAsArray[0];
        _energy[1] = resp.response._body.valuesAsArray[0];
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
    }, delay);
  });

  socket.on("error", console.error);
  socket.connect(options);
};
