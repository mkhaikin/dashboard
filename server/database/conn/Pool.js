// establish Mysql Connection  
const mysql = require('mysql');  
var util = require('util');  
 
   // Init MySql Connection Pool  
const pool = mysql.createPool({  
       connectionLimit: 10,  
       host     : 'localhost',  
       user     : 'root',  
       password :  '',                       //'TCSuEvEgC42WsJBY',  
       database: 'nb_dashboard'  
     });  

     pool.getConnection((err, connection) => {
      if (err) {
          if (err.code === 'PROTOCOL_CONNECTION_LOST') {
              console.error('Database connection was closed.')
          }
          if (err.code === 'ER_CON_COUNT_ERROR') {
              console.error('Database has too many connections.')
          }
          if (err.code === 'ECONNREFUSED') {
              console.error('Database connection was refused.')
          }
      }
      if (connection) connection.release()
      return
  })
  
  // Promisify for Node.js async/await.
 pool.query = util.promisify(pool.query) 
 pool.getConnection = util.promisify(pool.getConnection);

module.exports = pool;  