// init express app dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./routes');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

const { body,validationResult, sanitizeBody } = require('express-validator');
    body('name').isLength({ min: 1 }).trim().withMessage('Name empty.')
	  .isAlpha().withMessage('Name must be alphabet letters.'),
	  sanitizeBody('name').trim().escape();   
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// recognize incoming req as JSON Object
app.use(express.json());
// Set a static folder in the public directory
app.use(express.static('public'));
app.use('/', routes());

// silence the server request for a fac icon
app.get('/favicon.ico', (req,res,next) => {
    return res.sendStatus(204);
});
//Static page for FORM
// app.get('/form', function(request, response) {
// 	response.sendFile(path.join(__dirname + '/public/index.html'));
// });

// Active on port #
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));

//Export module to be used by others
module.export = app;