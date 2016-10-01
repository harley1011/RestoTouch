var models = require("../../database/models");
var passwordHasher = require("../helpers/password_hash");
var userModel;
var jwt = require('jwt-simple');
var configAuth = require('../../config/auth');



module.exports = {
  register: register,
  setDatabase: setDatabase
};

function setDatabase (m) {
  models = m;
  userModel = models.getUserModel();
}

function register(req, res) {
  var user = req.body;
  var passwordData = passwordHasher.saltHashPassword(user.password);
  user.password = passwordData.passwordHash;
  user.salt = passwordData.salt;
  return userModel.create(user).then(function(newUser) {
    var info = userInfo(newUser.dataValues);
    return res.json({success: 1, description: "User registered", "user": info.user, "accessToken":  info.token});
  });
}

function userInfo(user) {
  var token = genToken(user);
  user.password = "";
  user.salt = "";
  return {user: {
    "id": user.id,
    "firstName": user.firstName,
    "lastName": user.lastName,
    "email": user.email},
    "token": token.token
  }
}


function genToken(user) {
  var expires = expiresIn(10000);
  var token = jwt.encode({
    exp: expires,
    email: user.email,
    id: user.id
  }, configAuth.secret);

  return {
    token: token,
    expires: expires,
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

