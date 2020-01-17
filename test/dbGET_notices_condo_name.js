const DAL = require('../server/model/DataAccessLogic');

const condoname = 'Demo Condo';

async function testNoticesByCondoName(condoname) {
    if (condoname) {
        try{
            var result = await DAL.getallNoticesByCondoName(condoname);

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
        console.log('Condo Name is missed!');
    }

};

testNoticesByCondoName(condoname).then(()=> console.log('test done')); 