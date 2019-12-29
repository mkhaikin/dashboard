const express = require('express');
const router = express.Router();


module.exports = () => {
    router.get('/', (req, res, next) => {
        return res.render('login', {
            title: 'Welcome to login'
        })
    });
    return router;
};