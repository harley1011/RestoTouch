var userModel = {}
var Promise = require('promise');
userModel.create = create;


exports.getUserModel = function() {
  return userModel;
};






function create(object) {
  return new Promise(function (fulfill, reject){
      object.id = 100;
      fulfill({dataValues: object});
    });
}
