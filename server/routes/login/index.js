const express = require('express');
const router = express.Router();
//const conn = require('../../database/conn/MySQLConnect');
//const  transactions = require('../../database/trans/transactions'); 
const pool = require('../../database/conn/Pool'); 
const DAL = require('../../model/DataAccessLogic');

module.exports = () => {
    router.get('/', (req, res, next) => {
        return res.render('login', {
            title: 'Welcome to login',
            msg: 'what is your username'
        });
    });
    /*
    router.post('/', (req, res, next) => {
        var username = req.body.username;
        var password = req.body.password;
        if (username && password) {
            transactions.authorization(username, password, res, function ( err, results){
                if(err){
                    return res.status(501).json({
                        message: 'Not able to query the database'
                    });
                }else if(results.length > 0) {
                        req.session.loggedin = true;
                        req.session.username = username;
                        res.redirect('/dashboard');
                    } else {
                        res.send('Incorrect Username and/or Password!');
                    }			
                 res.end();
                
            });
        } else {
            res.send('Please enter Username and Password!');
            res.end();
        }
    });
    */
/**/
   router.post('/', async function(req, res, next) {
        var userName = req.body.username;
        var password = req.body.password;
        if (userName && password) {
            try{
                var result = await DAL.validateUser(userName,password);

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
                    console.log(userName+' is logged in!');
                    req.session.loggedIn = true;
                    req.session.userName = userName;
                    
                    res.redirect('/dashboard');
                } else {                  
                        //res.send('Incorrect Username and/or Password!');
                        console.log(result.message); 
                        res.send(result.message);
                }
            }catch(e){
                console.log(e);
                return res.status(501).json({
                    message: 'Not able to query the database'
                });
            }
        }	
        else{ // username OR password == null
            res.send('Username and/or Password are/is missed!');
        }
    });

    return router;
};
