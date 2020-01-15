const RES = require('./result');
//const pool = require('../database/conn/Pool'); 
const transactions = require('../database/trans/transactions'); 

class Account {
  constructor() {
    
    this._username = '';	
    this._password = '';	
    this._email = '';	
    this._condo_code = '';    
  }

  setAccount( username, password, email, condo_code){
    
    this._username = username;	
    this._password = password;	
    this._email = email;	
    this._condo_code = condo_code;
  }

  getAccount(){
      return [ this._username, this._password, this._email, this._condo_code];
  }

  set username(username) {
    this._username = username;
  }
  get username() {
    return this._username;
  }

  set password(password) {
    this._password = password;
  }
  get password() {
    return this._password;
  }

  set email(email) {
    this._email = email;
  }
  get email() {
    return this._email;
  }

  set condo_code(condo_code) {
    this._condo_code = condo_code;
  }
  get condo_code() {
    return this._condo_code;
  }

  async validateAccount(username, password){
    //return RES.setResult(1, null);
    try{
        //var query = 'SELECT * FROM accounts WHERE username = ? AND password = ?';
        //const results = await pool.query(query, [username, password]);
        const results = await transactions.getAccount(username, password);
        console.log(results);
        
        if(JSON.stringify(results).length > 2) { // '[]' means empty result, length == 2
          //console.log('Success');
          return { data: results, message: "Success" };
        } else { 
          //console.log('Incorrect');
          return { data: 0, message: 'Incorrect Username and/or Password!' };                 
        }	
    }catch(err){  
      return { data: 0, message: 'Status (501). Not able to query the database' };          
    }finally{
      
    }

  }

}

module.exports = new Account(); 

