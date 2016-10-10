var Sequelize = require('sequelize');
var configDB = require('../config/database.js');
var sequelize = new Sequelize(configDB.url);
var userModel = sequelize.import('./models/users.js');
var restaurantModel = sequelize.import('./models/restaurants.js');
var menuModel = sequelize.import('./models/menus.js');

restaurantModel.belongsTo(userModel, {onDelete: 'cascade', foreignKey: 'userId'});
menuModel.belongsTo(userModel, {onDelete: 'cascade', foreignKey: 'userId'});

userModel.sync();
restaurantModel.sync();
menuModel.sync();

exports.getUserModel = function() {
  return userModel;
};

exports.getRestaurantModel = function() {
  return restaurantModel;
};

exports.getMenuModel = function() {
  return menuModel;
};
