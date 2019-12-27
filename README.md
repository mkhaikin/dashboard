# dashboard
express dashboard app with sql database

## Middleware
This app will use the Express middleware for routing purposes.

## Database
The date will be indexed and stored in a SQL database

#### git book
https://book.git-scm.com/book/en/v2
or basic guide >>> https://rogerdudler.github.io/git-guide/

### Instructions
git clone https://github.com/YOUR-USERNAME/repoName 
Create folders called public, server, views 
npm init => to initialize folder
install middleware 
npm i express, express-handlebars, body-parser
inside server/index.js include app dependecies

// init express app dependencies
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Active on port #
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//Export module to be used by others
module.export = app;