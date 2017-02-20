var jwt = require('jwt-simple');
var configAuth = require('./config/auth');
var tokenNotRequiredRoutes = ['/login', '/register','/logout'];
var path = require('path');

module.exports = function(req, res, next) {
  for (var i = 0; i < tokenNotRequiredRoutes.length; i++) {
    if (tokenNotRequiredRoutes[i] == req.url) {
      next();
      return;
    }
  }
  var token =  req.headers['x-access-token'];
  if (token) {
    try {
      var decoded = jwt.decode(token, configAuth.secret);
      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired"
        });
        return;
      }
      req.email = decoded.email;
      req.userId = decoded.id;
      next();

    } catch (err) {
      return res.sendFile(path.join(__dirname + '/dist/prod/index.html'));

    }
  } else {
    return res.sendFile(path.join(__dirname + '/dist/prod/index.html'));
  }
};
