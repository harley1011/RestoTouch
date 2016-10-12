var Sequelize = require('sequelize');
var configDB = require('../config/database.js');
var sequelize = new Sequelize(configDB.url);
var userModel = sequelize.import('./models/users.js');
var restaurantModel = sequelize.import('./models/restaurants.js');
var menuModel = sequelize.import('./models/menus.js');
var restaurantMenuModel = sequelize.import('./models/restaurantmenu.js');
var menucategorymodel = sequlize.import('./models/menucategory.js');
var categoryModel = sequelize.import('./models/categories.js');

menuModel.belongsToMany(categoryModel, {through:menucategorymodel});
categoryModel.belongsToMany(menuModel, {through:menucategorymodel});


restaurantModel.belongsTo(userModel, {onDelete: 'cascade', foreignKey: 'userId'});
menuModel.belongsTo(userModel, {onDelete: 'cascade', foreignKey: 'userId'});

restaurantModel.belongsToMany(menuModel, {through: restaurantMenuModel});
menuModel.belongsToMany(restaurantModel, {through: restaurantMenuModel});

userModel.sync();
restaurantModel.sync();
categoryModel.sync();
menuModel.sync();
restaurantMenuModel.sync();

exports.getUserModel = function() {
  return userModel;
};

exports.getRestaurantModel = function() {
  return restaurantModel;
};

exports.getMenuModel = function() {
  return menuModel;
};

exports.getMenuModel = function() {
  return menuModel;
};
