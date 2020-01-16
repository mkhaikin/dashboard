const DAL = require('../server/model/DataAccessLogic');

const condocode = 'abcd1234';

async function testAllNotices(condocode) {
    if (condocode) {
        try{
            var result = await DAL.getallNotices(condocode);

            if(result.data != 0) {
                console.log('Result is not empty. There are notices!'); 
            } else {  
                    console.log(result.message); 
            }
        }catch(e){
            console.log(e + 'Not able to query the database');
        }
    }	
    else{ // condo code == null
        console.log('Condo Code is missed!');
    }

};

testAllNotices(condocode).then(()=> console.log('test done')); 