const DAL = require('../server/model/DataAccessLogic');

var records = [
    ['Demo Condo', 'Fire Alarm testing.', '2020-04-01 12:00:00', '2020-04-01 12:30:00', '10'],
    ['Demo Condo', 'Repair work with electricity. Temporary shutdown.', '2020-04-02 12:00:00', '2020-04-02 12:30:00', '11'],
    ['Demo Condo', 'Elevator repairing.',  '2020-04-03 12:00:00', '2020-04-03 12:30:00', '3' ]
  ];

async function testInsertNotices(records) {
    if (records.length > 0) {
        console.log('Records to insert: ' + records.length);
        try{
            var result = await DAL.insertNotices(records);

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

testInsertNotices(records).then(()=> console.log('test done')); 