'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = express();
var cors = require('cors')

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};
app.use(cors());


require('./websiteRoutes.js')(app, express);

//app.all('/*', [require('./authenticator.js')]);

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
