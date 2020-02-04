const express = require('express');
const router = express.Router();
const session = require('express-session');
const DAL = require('../../model/DataAccessLogic');

module.exports = () => {
    router.get('/', async (req, res, next) => {

	if (req.session.loggedin) {
        const userName = req.session.username
        ///////////////////////////////////
        var result;
            try{
                result = await DAL.getallNoticesByCondoName(userName);
    
                if(result.data != 0) {
                    console.log('Result is not empty. There are notices!--------------------'); 
                    console.log(result.data);
                    console.log("End result------------------");
                } else { 
                        console.log(result.message); 
                }
            }catch(e){
                console.log(e + 'Not able to query the database');
            }


        /////////////////////////////////////////
		return res.render('dashboard', {
            loggedin: true,
            //title: 'Welcome to dashboard',
            title:JSON.stringify(result),
            msg:'Welcome back, ' + userName + '!' ,
        //    result: result
        
            });
	} else {
		return res.redirect('/login');  
	}
	res.end();
    });

return router;
};
