const DAL = require('../server/model/DataAccessLogic');

const condoname = 'Demo Condo';

async function testNoticesCurrentActive(condoname) {
    if (condoname) {
        try{
            var result = await DAL.getNoticeInFull(condoname);

            if(result.data != 0) {
                console.log('Result is not empty. There are notices!'); 
                //console.log(JSON.stringify(result.data));
                var res = JSON.parse(JSON.stringify(result.data));
                var array = [];
                res.forEach( function  (value) {
                    //console.log(Object.keys(value));
                    let myMap = new Map();
                    for(var key in value) {
                        //console.log(key + " = " + value[key]);
                        myMap.set(key, value[key]);
                    }
                    array.push(myMap);

                    //console.log(value);
                });
                
                console.log(array);
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

testNoticesCurrentActive(condoname).then(()=> console.log('test done')); 