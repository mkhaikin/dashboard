const express = require('express');
const exphbs = require('express-handlebars');
const router = express.Router();
const conn = require('../../database/conn/conn');

module.exports = () => {
    router.get('/', (req, res, next) => {
        return res.render('login', {
            title: 'Welcome to login',
            msg: 'what is your username'
        });
    });

    router.post('/', (req, res, next) => {
        var username = req.body.username;
        var password = req.body.password;
        if (username && password) {
            conn.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
                if (results.length > 0) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.redirect('/home');
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

    return router;
};