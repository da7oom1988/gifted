var mysql2 = require('mysql2');

var con = mysql2.createPool({
  host: "localhost",
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
}).promise();


module.exports = con