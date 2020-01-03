const express = require('express');
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
        var username = 'Demo Condo';
        var password = 'condo123';
        console.log('username is '+ username);
        res.redirect('/dashboard');
        if (username && password) {
            conn.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
                if (results.length > 0) {
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

    return router;
};