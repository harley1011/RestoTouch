'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = express();
var cors = require('cors');
var morgan = require('morgan');
var multer = require('multer');
var fs = require('fs');
var orderNotifier = require('./restoWeb/api/controllers/orderNotifier.js');

module.exports = app; // for testing

var config = {
  appRoot: __dirname + "/restoWeb" // required config
};


app.use(cors());
app.use(morgan('combined'));

require('./restoWeb/websiteRoutes')(app, express);

app.all('/*', [require('./restoWeb/authenticator.js')]);


SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) {
    throw err;
  }
  var port = process.env.PORT || 10010;
  var appListen = app.listen(port);
  swaggerExpress.register(app);

  orderNotifier(appListen);
  console.log('Server listening on port', port);
});

