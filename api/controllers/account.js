var models = require("../../database/models");
var userModel = models.getUserModel();

module.exports = {
  register: register
};


function register(req, res) {
  var user = req.body;

  userModel.create(user).then(function(result) {
    return res.json({success: 1, description: "User registered"});
  });
}
