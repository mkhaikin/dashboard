const express = require('express');
const router = express.Router();


module.exports = () => {
    router.get('/', (req, res, next) => {

	if (req.session.loggedin) {
		return res.render('dashboard', {
            title: 'Welcome to dashboard',
            msg:'Welcome back, ' + req.session.username + '!'
            });
	} else {
		return res.render('dashboard', {
            title: 'Welcome to dashboard',
            msg:'Please log in !'
            });
	}
	res.end();
    });

return router;
};
