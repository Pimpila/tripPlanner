// require built-in stuff
const path = require('path');

// require node modules from npm
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

// require own stuff
const routes = require('./routes');
const app = express();

// nunjucks rendering boilerplate:
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});

// middleware:
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// routing:
app.use(routes);
app.listen(54, function() {
  console.log('listening on port 3000');
});

