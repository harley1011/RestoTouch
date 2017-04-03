'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = express();
var cors = require('cors');
var morgan = require('morgan');
var multer = require('multer');
var fs = require('fs');
var DIR = './uploads/';
var orderNotifier = require('./api/controllers/orderNotifier.js');

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};


app.use(cors());
app.use(morgan('combined'));



require('./websiteRoutes.js')(app, express);

app.all('/*', [require('./authenticator.js')]);
app.listen(port);
SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) {
    throw err;
  }

  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;

 // orderNotifier(app.listen(port));
  console.log('Server listening on port', port);
});

