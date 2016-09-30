var models = require("../../database/models");
var passwordHasher = require("../helpers/password_hash");
var userModel = models.getUserModel();
var jwt = require('jwt-simple');
var configAuth = require('../config/auth');

module.exports = {
  register: register
};


function register(req, res) {
  var user = req.body;
  var passwordData = passwordHasher.saltHashPassword(user.password);
  user.password = passwordData.passwordHash;
  user.salt = passwordData.salt;

  userModel.create(user).then(function(result) {
    return res.json({success: 1, description: "User registered", user: userInfo(user)});
  });
}

function userInfo(user) {
  var token = genToken(user);
  user.token = token.token;
  user.password = "";
  user.salt = "";
  return user;
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

