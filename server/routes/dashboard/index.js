const express = require('express');
const router = express.Router();
const session = require('express-session');
const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
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
