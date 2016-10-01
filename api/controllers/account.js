var models = require("../../database/models");
var passwordHasher = require("../helpers/password_hash");
var userModel = models.getUserModel();

module.exports = {
  register: register,
  login: login
};


function register(req, res) {
  var user = req.body;
  var passwordData = passwordHasher.saltHashPassword(user.password);
  user.password = passwordData.passwordHash;
  user.salt = passwordData.salt;

  userModel.create(user).then(function(result) {
    return res.json({success: 1, description: "User registered"});
  });
}

function login(req,res) {
  var user = req.body;

  userModel.findOne({ where: {
    email: user.email,
    password: user.password}
  }).then(function(result){
        return res.json({success: 1, description: "User logged in"});
      });
}
