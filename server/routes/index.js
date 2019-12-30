// init routes module
const express = require('express');
const router = express.Router();
// create routing directories from parent folder
const adminRoute = require('./admin');
const dashboardRoute = require('./dashboard');
const loginRoute = require('./login');


module.exports = () => {
    // create a root route handler
    router.get('/', (req, res, next) => {
        return res.send('Index Page');
    });

    router.use('/admin', adminRoute());
    router.use('/dashboard', dashboardRoute());
    router.use('/login', loginRoute());
    
    return router;
};