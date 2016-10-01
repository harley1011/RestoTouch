var userModel = {}
var restaurantModel = {}
var Promise = require('promise');
userModel.create = create;
restaurantModel.create = create;


exports.getUserModel = function() {
  return userModel;
};

exports.getRestaurantModel = function () {
  return restaurantModel;
}






function create(object) {
  return new Promise(function (fulfill, reject){
      object.id = 100;
      fulfill({dataValues: object});
    });
}
