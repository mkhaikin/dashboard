const DAL = require('../server/model/DataAccessLogic');

const user = 'Demo Condo';
const pass = 'condo123';

async function testUser(username, password) {
    if (username && password) {
        try{
            var result = await DAL.validateUser(username,password);

            if(result.data != 0) {
                console.log('Result is not empty. Username and Password are correct!'); 
            } else {  
                    console.log(result.message); 
            }
        }catch(e){
            console.log(e + 'Not able to query the database');
        }
    }	
    else{ // username OR password == null
        console.log('Username and/or Password are/is missed!');
    }

};

testUser(user, pass).then(()=> console.log('test done'));