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
const start = '2020-02-07 12:00';
const end = '2020-02-07 17:00';
const imgId = '11';

//1. insert a new notice
//2. select new notice and compare with expected values
//3. delete inserted notice

async function testDeleteNotice(condoname, text, start, end, imgId) {
    var recordID = 0;
    var comp = true;

    //1. Start insert a new notice
    if (condoname && text && start && end && imgId) {
        try{
            var result = await DAL.insertNotice(condoname, text, start, end, imgId);

            if(result.data > 0) {
                console.log('Result is not empty. Insert done! ' + result.data); 
                recordID = result.data;
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
    //1. End insert a new notice
    //2. Start select new notice and compare with expected values
    if(recordID > 0){
       
        try{
            var result = await DAL.getNoticeByID(recordID);

            if(result.data != 0) {
                var res = result.data;
                console.log('Result is not empty. Select done for ' + recordID + ' !'); 
                Object.keys(res).forEach(function(key) {
                    var row = res[key];
                    if(text == row.text && start == row.start && end == row.end)
                        console.log('Equal!');
                    else comp = false;
                  });
            } else {  
                    console.log(result.message); 
            }
        }catch(e){
            console.log(e + 'Not able to query the database');
        }
    }
    //2. End select new notice and compare with expected values
    //3. Start delete inserted notice
    if(comp == true){
        try{
            var result = await DAL.deleteNoticeById(recordID);

            if(result.data > 0) {
                console.log('Result is not empty. Delete done for ' + result.data + ' row! '); 

            } else {  
                    console.log(result.message); 
            }
        }catch(e){
            console.log(e + 'Not able to query the database');
        }
    }
    //3. End delete inserted notice

};

testDeleteNotice(condoname, text, start, end, imgId).then(()=> console.log('test done')); 