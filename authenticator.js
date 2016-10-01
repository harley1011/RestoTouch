var jwt = require('jwt-simple');
var configAuth = require('./config/auth');
var tokenNotRequiredRoutes = ['/login', '/register'];

module.exports = function(req, res, next) {

  for (var i = 0; i < tokenNotRequiredRoutes.length; i++) {
    if (tokenNotRequiredRoutes[i] == req.url) {
      next();
      return;
    }
  }

  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'] || req.cookies['x_access_token'];
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
      res.status(401);
      return res.json({
        "success": false,
        "status": 401,
        "message": "Invalid Token or Key",
        "error": err
      });

    }
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid Token or Key"
    });
    return;
  }
};
