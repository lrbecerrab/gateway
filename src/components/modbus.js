const modbus = require("jsmodbus");
const net = require("net");
const socket = new net.Socket();

const options = {
  host: "127.0.0.1",
  port: "502",
};

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
  }, 5000);
});

socket.on("error", console.error);
socket.connect(options);
