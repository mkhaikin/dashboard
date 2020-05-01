//methods for fetching mysql data  
//const conn = require('../conn/MySQLConnect'); 
const pool = require('../conn/Pool'); 

function Transaction() { 
    this.getAccount = async function(userName, password){
        var query = 'SELECT * FROM accounts WHERE username = ? AND password = ?';
        return await pool.query(query, [userName, password]);   
    };
    // get all notices
    this.getAllNoticesByUser  = async function(code){
        var query = '(SELECT c.name, n.id, n.title, n.text, CONCAT(DATE(n.start), \' \', DATE_FORMAT(n.start, \'%H:%i\')) as start,' + 
                       ' CONCAT(DATE(n.end ), \' \', DATE_FORMAT(n.end, \'%H:%i\')) as end, p.name as icon ' +
                       ' FROM condos as c JOIN new_noticetable as n ON c.code = n.condo  ' +
                       ' JOIN pictures as p ON n.icon = p.id '  +
                       ' WHERE c.code = ? ORDER BY n.id DESC ); ';
        return await pool.query(query, code);                       
    };
    
    this.getAllNoticesByUserName  = async function(userName){
        var query = '(SELECT c.name, n.id, n.title, n.text, CONCAT(DATE(n.start), \' \', DATE_FORMAT(n.start, \'%H:%i\')) as start,' + 
                       ' CONCAT(DATE(n.end ), \' \', DATE_FORMAT(n.end, \'%H:%i\')) as end, p.name as icon ' +
                       ' FROM condos as c JOIN new_noticetable as n ON c.code = n.condo  ' +
                       ' JOIN pictures as p ON n.icon = p.id '  +
                       ' WHERE c.name = ? ORDER BY n.id DESC ); ';
        return await pool.query(query, userName);                       
    };

    this.getNoticeByID  = async function(id){
        var query = '(SELECT n.id, n.title, n.text, CONCAT(DATE(n.start), \' \', DATE_FORMAT(n.start, \'%H:%i\')) as start,' + 
                       ' CONCAT(DATE(n.end ), \' \', DATE_FORMAT(n.end, \'%H:%i\')) as end, p.name as icon ' +
                       ' FROM new_noticetable as n ' +
                       ' JOIN pictures as p ON n.icon = p.id '  +
                       ' WHERE n.id = ?); ';
        return await pool.query(query, id);                       
    };
    // get all notice icons
    this.getAllNoticesIcons  = async function(){
        var query = '(SELECT p.id as picid, p.name as picture FROM pictures as p);';
        return await pool.query(query);                       
    };

    this.getNoticesInFull  = async function(userName){// get all current notice with active status
        var query = 'SELECT c.name, n.id, n.text, CONCAT(DATE(n.start), \' \', DATE_FORMAT(n.start, \'%H:%i\')) as start,' + 
        ' CONCAT(DATE(n.end ), \' \', DATE_FORMAT(n.end, \'%H:%i\')) as end, p.name as icon ' +
        ' FROM condos as c JOIN new_noticetable as n ON c.code = n.condo  ' +
        ' JOIN pictures as p ON n.icon = p.id '  +
        'WHERE c.name = ? AND n.start < NOW() and n.end > NOW() and n.status = 1 ORDER BY n.start DESC;';
        return await pool.query(query, userName);                       
    };

    this.insertNotice = async function(userName, title, text, start, end, imgId){
        const db = await pool.getConnection();
        let res = 0;
            try {
                await withTransaction( db, async () => {
                    var query ='INSERT INTO new_noticetable (condo, title, text, start, end, icon, created)' + 
                                ' Values((SELECT code FROM condos WHERE name = ?), ?,?,?,?,?, NOW());';
                    var params = [userName, title, text, start, end, imgId];
                    var insRes = await pool.query(query, params); 
                    //console.log( insRes.insertId);
                    res = insRes.insertId;
                } );
            } catch ( err ) {
              console.log(err); 
            }
        return res;
    };

    this.insertNotices = async function(records){
        const db = await pool.getConnection();
        var res = 0; 
            try {
                await withTransaction( db, async () => {
                    var query = 'SELECT code FROM condos WHERE name = ?';
                    result =  await pool.query(query, records[0][0]);
                    var code = 0;
                    Object.keys(result).forEach(function(key) {
                        var row = result[key];
                        //console.log(row.code);
                        code = row.code;
                      });
                    records.forEach( function  (value) {
                        value[0] = code;
                        //console.log(value);
                    });  
                    var query ='INSERT INTO new_noticetable (condo, text, start, end, icon)' + 
                                ' Values  ?;';
                    var insRes = await pool.query(query, [records]); 
                    //console.log( insRes.affectedRows);
                    res = insRes.affectedRows;
                } );
            } catch ( err ) {
              console.log(err); 
            }
        return res;
    };

    async function withTransaction( db, callback ) {
        try {
          await db.beginTransaction();
          await callback();
          await db.commit();
        } catch ( err ) {
          await db.rollback();
          throw err;
        } finally {
          await db.release();
        }
    };
    //update notice
    this.updateNotice = async function( noticeId, title, text, start, end, imgId){
        const db = await pool.getConnection();
        let res = 0;
            try {
                await withTransaction( db, async () => {
                    var query = 'UPDATE new_noticetable '  +
                    'SET title= ?, ' +
                    '   text= ?, ' +
                    'start= ?, ' +
                    'end= ?, ' +
                    'icon= ?, ' +
                    'modified= NOW() ' +
                    'WHERE id= ?;';
                    var params = [title, text, start, end, imgId, noticeId];
                    var updateRes = await pool.query(query, params); 
                    //console.log(  updateRes.affectedRows);
                    res = updateRes.affectedRows;
                });
            } catch ( err ) {
              console.log(err);               
            }
        return res;
    }; 

    this.deleteNoticeByID = async function( id){
        const db = await pool.getConnection();
        let res = 0;
            try {
                await withTransaction( db, async () => {                    
                var query = 'DELETE FROM new_noticetable WHERE id = ?;';                
                var updateRes = await pool.query(query, id); 
                    //console.log(  updateRes.affectedRows);
                    res = updateRes.affectedRows;
                } );
            } catch ( err ) {
              console.log(err);               
            }
        return res;
    }; 
    
    this.deleteNoticesByID = async function( id){
        const db = await pool.getConnection();
        let res = 0;
            try {
                await withTransaction( db, async () => {                    
                var query = 'DELETE FROM new_noticetable WHERE IN (' + id.join() + ')';               
                var updateRes = await pool.query(query, id); 
                    //console.log(  updateRes.affectedRows);
                    res = updateRes.affectedRows;
                } );
            } catch ( err ) {
              console.log(err);               
            }
        return res;
    }; 

    this.authorization = function(userName, password, res, callback){
        conn.init();
        conn.acquire(function (err, con) { 
            var query = 'SELECT * FROM accounts WHERE username = ? AND password = ?';
             //if (err) throw err; // not connected!
             con.query(query, [userName, password], function (err, result) {  
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
}

module.exports = new Transaction(); 
