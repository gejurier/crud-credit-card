const mysql = require('mysql');
const { promisify }= require('util');
const { database } = require('./keys');
// const pool = mysql.createPool(database);
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Mnc30062022',
  database: 'test',
  acquireTimeout: 10000 // Ajusta esto según tus necesidades
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection fail');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database fail');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection fail');
    }
  }

  if (connection) connection.release();
  console.log('DB is OK');

  return;
});

//CONVIRTIENDO PROMESAS
pool.query = promisify(pool.query);
module.exports = pool;