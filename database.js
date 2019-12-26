const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  multipleStatements: true
});

connection.connect((err) => {
  if (!err) {
    console.log('Database is connecting');
  } else {
    console.log('Error connection');
  }
});

module.exports = connection;
