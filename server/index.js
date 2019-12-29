// init express app dependencies
const express = require('express');
const app = express();
const routes = require('./routes');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');

// initial express routes
app.use('/', routes());
// Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// body-Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// session storage
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
// recognize incoming req as JSON Object
app.use(express.json());
// Set a static folder in the public directory
app.use(express.static('public'));
// silence the server request for a fac icon
app.get('/favicon.ico', (req,res,next) => {
    return res.sendStatus(204);
});
// Basic Route without routing middleware
// app.get('/', (req,res,next) => {
//     res.send('Memebers Page');
// });

// Active on port #
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));

//Export module to be used by others
module.export = app;