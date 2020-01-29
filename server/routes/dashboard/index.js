const express = require('express');
const router = express.Router();
const session = require('express-session');

module.exports = () => {
    router.get('/', (req, res, next) => {

	if (req.session.loggedin) {
        const userName = req.session.username
		return res.render('dashboard', {
            loggedin: true,
            title: 'Welcome to dashboard',
            msg:'Welcome back, ' + userName + '!' 
            });
	} else {
		return res.redirect('/login');  
	}
	res.end();
    });

return router;
};
