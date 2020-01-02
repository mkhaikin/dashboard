// establish Mysql Connection  
var mysql = require('mysql');  
  
function conn() {  
  this.pool = null;  
    
  // Init MySql Connection Pool  
  this.init = () => {  
    this.pool = mysql.createPool({  
      connectionLimit: 10,  
      host     : 'localhost',  
      user     : 'root',  
      password : 'TCSuEvEgC42WsJBY',  
      database: 'nb_dashboard'  
    });  
  }; 

   // acquire connection and execute query on callbacks  
   this.acquire = function(callback) {  
    this.pool.getConnection(function(err, conn) {  
      callback(err, conn);  
    });  
  };  
}  
  
module.exports = new conn();  