const DAL = require('../server/model/DataAccessLogic');

async function testAllIcons() {
    try{
        var result = await DAL.getIconsList();

        if(result.data != 0) {
            console.log('Result is not empty. There are icons!'); 
        } else {  
                console.log(result.message); 
        }
    }catch(e){
        console.log(e + 'Not able to query the database');
    }    
};

testAllIcons().then(()=> console.log('test done')); 