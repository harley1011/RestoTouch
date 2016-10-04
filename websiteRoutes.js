var path = require('path');

module.exports = function (app, express) {
  app.use(express.static(__dirname + '/'));

  app.use(express.static(__dirname + '/dist/prod'));

  app.use(express.static(__dirname + '/dist/prod/assets/'));

}
