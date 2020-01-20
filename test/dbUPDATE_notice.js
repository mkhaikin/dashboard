const DAL = require('../server/model/DataAccessLogic');
/*
const condoname = 'Demo Condo';
const text = 'Fire Alarm testing';
const start = '2020-02-24 12:00:00';
const end = '2020-03-01 23:59:00';
const imgId = '10';

*/
const id = '16';
const text = 'Repair work with electricity. Temporary shutdown.';
const start = '2020-01-07 12:00:00';
const end = '2020-01-07 17:00:00';
const imgId = '11';

async function testUpdatetNotice(id, text, start, end, imgId) {
    if (id && text && start && end && imgId) {
        try{
            var result = await DAL.updateNotice(id, text, start, end, imgId);

            if(result.data > 0) {
                console.log('Result is not empty. Update done! ' + result.data); 
            } else {  
                    console.log(result.message); 
            }
        }catch(e){
            console.log(e + 'Not able to query the database');
        }
    }	
    else{ // condo code == null
        console.log('Input data are missed!');
    }

};

testUpdatetNotice(id, text, start, end, imgId).then(()=> console.log('test done')); 