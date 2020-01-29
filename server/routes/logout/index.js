const express = require('express');
const router = express.Router();
const session = require('express-session');

module.exports = () => {
    router.get('/', (req, res, next) => {
        return res.render('logout', {
            title: 'You are now logged out'
        })
    });

    return router;
};