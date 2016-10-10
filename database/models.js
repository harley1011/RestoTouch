var Sequelize = require('sequelize');
var configDB = require('../config/database.js');
var sequelize = new Sequelize(configDB.url);
var userModel = sequelize.import('./models/users.js');
var restaurantModel = sequelize.import('./models/restaurants.js');
var restaurantsLanguages = sequelize.import('./models/restaurantsLanguages.js');


restaurantModel.belongsTo(userModel, {onDelete: 'cascade', foreignKey: 'userId'});
restaurantModel.hasMany(restaurantsLanguages, {as: 'supportedLanguages', foreignKey: 'restaurantId'});

userModel.sync();
restaurantModel.sync();
restaurantsLanguages.sync();

exports.getUserModel = function() {
  return userModel;
};

exports.getRestaurantModel = function() {
  return restaurantModel;
};

exports.getRestaurantsLanguageModel = function () {
  return restaurantsLanguages;
}
