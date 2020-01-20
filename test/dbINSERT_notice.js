const DAL = require('../server/model/DataAccessLogic');
/*
const condoname = 'Demo Condo';
const text = 'Fire Alarm testing';
const start = '2020-02-24 12:00:00';
const end = '2020-03-01 23:59:00';
const imgId = '10';

*/
const condoname = 'Demo Condo';
const text = 'Repair work with electricity. Temporary shutdown.';
const start = '2020-02-07 12:00:00';
const end = '2020-02-07 17:00:00';
const imgId = '11';

async function testInsertNotice(condoname, text, start, end, imgId) {
    if (condoname && text && start && end && imgId) {
        try{
            var result = await DAL.insertNotice(condoname, text, start, end, imgId);

            if(result.data > 0) {
                console.log('Result is not empty. Insert done! ' + result.data); 
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

testInsertNotice(condoname, text, start, end, imgId).then(()=> console.log('test done')); 