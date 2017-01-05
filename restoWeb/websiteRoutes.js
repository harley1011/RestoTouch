var path = require('path');

module.exports = function (app, express) {
  app.use(express.static(__dirname + '/'));

  app.use(express.static(__dirname + '/dist/prod'));

  app.use(express.static(__dirname + '/dist/prod/assets/'));

  app.get(['/login', '/logout', '/register'], function (req, res) {
    return res.sendFile(__dirname + '/dist/prod/index.html')
  })

}
