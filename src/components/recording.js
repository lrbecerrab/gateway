var mysql = require("mysql");

const { DBENDPOINT, DATABASE, USER, WP } = require("../utils/constants");

const saveRecord = (data) => {
  const connection = mysql.createConnection({
    host: DBENDPOINT,
    port: "3306",
    user: USER,
    password: WP,
    database: DATABASE,
  });

  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
  console.log("data: ", data);

  /* var sql = "INSERT INTO transactions (meterAddress) VALUES ?";
  connection.query(sql, data, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  }); */
};

module.exports = { saveRecord };
