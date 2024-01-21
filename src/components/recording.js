var mysql = require("mysql");

const { DBENDPOINT, DATABASE, USER, WP } = require("../utils/constants");

const saveRecord = (data) => {
  const con = mysql.createConnection({
    host: DBENDPOINT,
    user: USER,
    password: WP,
    database: DATABASE,
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "INSERT INTO transactions (transactionhash, initialtimestamp, finaltimestamp, latency, network, meterAddress, contract, datetimestamp, eConsumed, eProduced) VALUES ?";
    con.query(sql, data, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
};

module.exports = { saveRecord };
