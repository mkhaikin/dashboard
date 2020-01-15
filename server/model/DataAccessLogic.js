const pool = require('../database/conn/Pool'); 
//import { Account } from 'model/account';
const ACC = require('./account');
//import { Result } from 'model/result';

class DataAccessLogic {
    constructor() {
    }
    
    async validateUser(username, password) {
            
            var res = await ACC.validateAccount(username, password);
        // data validation
            return res;
    };
    


}

module.exports = new DataAccessLogic(); 


