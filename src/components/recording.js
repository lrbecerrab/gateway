var mysql = require("mysql");

const { DBENDPOINT, DATABASE, USER, WP } = require("../utils/constants");

const connectDB = () => {
  const connection = mysql.createConnection({
    host: DBENDPOINT,
    port: "3306",
    user: USER,
    password: WP,
    database: DATABASE,
  });

  connection.connect((err) => {
    if (err) {
      console.log("Error connecting to Db");
      console.log(err.message);
      connection.end();
    }
    console.log("Connection established");
  });
  return connection;
};

const saveRecord = async (connection, data) => {
  try {
    const sql =
      "INSERT INTO transactions (network, contract, meteraddress, datetimestamp, transactionhash, econsumed, eproduced, initialtimestamp, finaltimestamp, latency) VALUES (?,?,?,?,?,?,?,?,?,?);";
    connection.query(sql, data, (err, result) => {
      if (err) {
        console.log(err.message);
      }
      console.log("Registro insertado");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { saveRecord, connectDB };
