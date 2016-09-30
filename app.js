'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = express();
var models = require('./database/models.js');
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'Origin, X-Requested-With, Content-Type, Accept');

  // Pass to next layer of middleware
  next();
});

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  // if (swaggerExpress.runner.swagger.paths['/swagger']) {
  //   while(true){
  //
  //   };
  // }
});

require('./websiteRoutes.js')(app, express);
