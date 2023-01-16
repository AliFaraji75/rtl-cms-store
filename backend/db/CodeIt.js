const mysql = require("mysql");

const CodeItShopDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "codeit_shop",
});

module.exports = CodeItShopDB;
