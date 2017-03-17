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
const models = require('./models')
const Place = models.Place
const Restaurant = models.Restaurant
const Activity = models.Activity
const Hotel = models.Hotel

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
//SYNC
Place.sync({force: false})
.then(function(){
  return Restaurant.sync({force: false})
})
.then(function(){
  return Activity.sync({force: false})
})
.then(function(){
  return Hotel.sync({force: false})
})
.then(function(){
  app.listen(3000, function() {
    console.log('listening on port 3000');
  });
})

