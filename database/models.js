var Sequelize = require('sequelize');
var configDB = require('../config/database.js');
var sequelize = new Sequelize(configDB.url);
var userModel = sequelize.import('./models/users.js');
var restaurantModel = sequelize.import('./models/restaurants.js');
var categoryModel = sequelize.import('./models/categories.js');

restaurantModel.belongsTo(userModel, {onDelete: 'cascade', foreignKey: 'userId'});
categoryModel.belongsTo(userModel, {onDelete: 'cascade', foreignKey: 'userId'});

userModel.sync();
restaurantModel.sync();
categoryModel.sync();

exports.getUserModel = function() {
  return userModel;
};

exports.getRestaurantModel = function() {
  return restaurantModel;
};

exports.getCategoryModel = function() {
  return categoryModel;
};
