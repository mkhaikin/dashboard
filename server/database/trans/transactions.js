//methods for fetching mysql data  
const conn = require('../conn/MySQLConnect'); 

function Transaction() { 

    // get user by id
    this.getUserById = () => {
        conn.init();
        conn.acquire((req,res) => {

        });
    }

    this.authorization = function(username, password, res, callback){
        conn.init();
        conn.acquire(function (err, con) { 
            var query = 'SELECT * FROM accounts WHERE username = ? AND password = ?';
             //if (err) throw err; // not connected!
             con.query(query, [username, password], function (err, result) {  
                if (typeof callback === 'function') {
                    if(err) 
                        callback(err, null);
                    else
                        callback(null, result);
                }                      
                con.release();
            });
        }); 
    };

    // get all notices data  
    this.getAllNoticesByCondoCode  = function (code, res, callback) {
        var data;
        conn.init();  
        
        // get condo code as parameter to passing into query and return filter data  
        conn.acquire(function (err, con) {  

            var query = '(SELECT c.name, n.id, n.text, CONCAT(DATE(n.start), \' \', DATE_FORMAT(n.start, \'%H:%i\')) as start,' + 
                       ' CONCAT(DATE(n.end ), \' \', DATE_FORMAT(n.end, \'%H:%i\')) as end, null as picid, p.name as icon ' +
                       ' FROM condos as c JOIN new_noticetable as n ON c.code = n.condo  ' +
                       ' JOIN pictures as p ON n.icon = p.id '  +
                       ' WHERE c.code = ? ORDER BY n.id DESC ) '  +
                       ' UNION (SELECT null , null , null , null, null , p.id as picid, p.name as picture FROM pictures as p);'; 

            //if (err) throw err; // not connected!
            con.query(query, code, function (err, result) {  
                if (typeof callback === 'function') {
                    if(err) 
                        callback(err, null);
                    else
                        callback(null, result);
                }                      
                con.release();
            });  
        });  
    }; 
    
    this.getNoticeByID  = function (id, res, callback) {
        var data;
        // initialize database connection  
        connection.init();  
        
        // get condo code as parameter to passing into query and return filter data  
        connection.acquire(function (err, con) {  
            var query = 'SELECT c.name, n.id, n.text, CONCAT(DATE(n.start), \' \', HOUR(n.start), \':\', MINUTE(n.start)) as start,' + 
                        ' CONCAT(DATE(n.end ), \' \', HOUR(n.end ), \':\', MINUTE(n.end )) as end, p.name as icon' +
                        ' FROM condos as c JOIN new_noticetable as n ON c.code = n.condo ' +
                        'JOIN pictures as p ON n.icon = p.id ' +
                        'WHERE n.id = ?;'; 

            //if (err) throw err; // not connected!

            con.query(query, id, function (err, result) {  
                    //con.release();  
                    //res.send(result);  //commented by Yefim
                    //data = result;
                    //console.log(result);
                    if (typeof callback === 'function') {
                        if(err) callback(err, null);
                        else
                            callback(null, result);
                      }  
                      
                    con.release();
                });  

        });  
        //return data;
    };  

    ////////////
    this.getNoticesByIDs  = function (ids, res, callback) {
        var data;
        // initialize database connection  
        connection.init();  
        
        // get condo code as parameter to passing into query and return filter data  
        connection.acquire(function (err, con) {  
            var query = 'SELECT c.name, n.id, n.text, CONCAT(DATE(n.start), \' \', HOUR(n.start), \':\', MINUTE(n.start)) as start,' + 
                        ' CONCAT(DATE(n.end ), \' \', HOUR(n.end ), \':\', MINUTE(n.end )) as end, p.name as icon' +
                        ' FROM condos as c JOIN new_noticetable as n ON c.code = n.condo ' +
                        'JOIN pictures as p ON n.icon = p.id ' +
                        'WHERE n.id IN (' + ids.join() + ')'; 
                                                

            //if (err) throw err; // not connected!

            con.query(query, function (err, result) {  
                    //con.release();  
                    //res.send(result);  //commented by Yefim
                    //data = result;
                    //console.log(result);
                    if (typeof callback === 'function') {
                        if(err) callback(err, null);
                        else
                            callback(null, result);
                      }
                    con.release();
                });  

        });  
        //return data;
    };  
    ////////////////

    //insert new notice
    this.insertNewNotice = function(condo, text, start, end, imgId, res, callback){
       
        // initialize database connection  
        connection.init();  
        // get condo code as parameter to passing into query and return filter data  
        connection.acquire((err, con) => {  

           var query ='INSERT INTO new_noticetable (condo, text, start, end, icon, created)' + 
                        ' Values((SELECT code FROM condos WHERE name = ?), ?,?,?,?, NOW());';
            var params = [condo, text, start, end, imgId];
                  
            con.query(query, params, (err, result) => {  

                if (typeof callback === 'function') {
                    if(err) {
                        console.log('Error1 in Insert!');
                        callback(err, null);
                    }

                    var queryLastId = 'SELECT MAX(id) as id FROM new_noticetable ' + 
                    'WHERE condo IN (SELECT code FROM condos WHERE name = ?);';
                    con.query(queryLastId, condo, function (err, result) {  

                        console.log("ID of inserted row: " + result);
                       
                        if(err){
                            console.log('Error2 in Insert!');
                            callback(err, null);
                        }
                        else
                            callback(null, result);
                    });  
                }  
                con.release();  

            });  
        }); 
    };  

    //update notice
    this.updateNotice = function( id, text, start, end, icon, res, callback){
        // initialize database connection  
        connection.init();  
        // get condo code and id as parameter to passing into query and return filter data  
        connection.acquire(function (err, con) {  
            var query = 'UPDATE new_noticetable '  +
                'SET text= ?, ' +
                'start= ?, ' +
                'end= ?, ' +
                'icon= ?, ' +
                'modified= NOW() ' +
                'WHERE id= ?;';
                                                    //console.log(start + '|' + end + '|' + id);    
            var params = [text, start, end, icon, id];    
            con.query(query, params, function (err, result) { 
                if (typeof callback === 'function') {                    
                    if(err){
                        console.log('Error in Update!');
                        callback(err, null);
                    }
                    else
                        callback(null, result);
                }
                con.release();                   
            });
        });
    }; 

    this.deleteNotice = function( id, callback){
        // initialize database connection  
        connection.init();  
        // get condo code and id as parameter to passing into query and return filter data  
        connection.acquire(function (err, con) {  
            var query = 'DELETE FROM new_noticetable WHERE id = ?;';
            con.query(query, id, (err, result) => {
                if (typeof callback === 'function') {
                    if(err){ 
                        console.log("Error: " + err.message);
                        callback(err, null);
                    }
                    else
                        callback(null, result);
                  } 
                con.release();  
                //res.send(result);  
            });
        });
    }; 
 
}

module.exports = new Transaction(); 
