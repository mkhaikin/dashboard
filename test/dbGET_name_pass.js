const DAL = require('../server/model/DataAccessLogic');

const username = 'Demo Condo';
const password = 'condo123';

if (username && password) {
    try{
        var result = DAL.validateUser(username,password);

        /* example of result JSON structure reading
        const data = JSON.parse(JSON.stringify(result));
        //console.log( data.data );
        data.data.forEach(function(item) {
        //console.log(item);
            console.log(item.username);
        });

        const val = data.data.every(function(el) {
            return (el.username !== null);
        });   
        console.log(val);  
        */       

        if(result.data != 0) {
            console.log('Username and Password are correct!'); 
           
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

console.log('--------------  Test done  -----------------');