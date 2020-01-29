// init routes module
const express = require('express');
const router = express.Router();
// create routing directories from parent folder
const loginRoute = require('./login');
const logoutRoute = require('./logout');
const dashboardRoute = require('./dashboard');



module.exports = () => {
    // create a root route handler
    router.get('/', (req, res, next) => {
        return res.send('Index Page');
    });
    
    router.use('/login', loginRoute());
    router.use('/logout', logoutRoute());
    router.use('/dashboard', dashboardRoute());
        
    return router;
};