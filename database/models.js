var Sequelize = require('sequelize');
var configDB = require('../config/database.js');
var sequelize = new Sequelize(configDB.url);
var userModel = sequelize.import('./models/users.js');
var restaurantModel = sequelize.import('./models/restaurants.js');
var menuModel = sequelize.import('./models/menus.js');
var restaurantMenuModel = sequelize.import('./models/restaurantmenu.js');
var menuCategoryModel = sequelize.import('./models/menucategory.js');
var categoryModel = sequelize.import('./models/categories.js');
var restaurantsLanguages = sequelize.import('./models/restaurantsLanguages.js');
var restaurantsTranslations = sequelize.import('./models/restaurantsTranslations.js');


menuModel.belongsToMany(categoryModel, {through:menuCategoryModel});
categoryModel.belongsToMany(menuModel, {through:menuCategoryModel});



restaurantModel.belongsTo(userModel, {onDelete: 'cascade', foreignKey: 'userId'});
restaurantModel.hasMany(restaurantsLanguages, {as: 'supportedLanguages', foreignKey: 'restaurantId'});
restaurantModel.hasMany(restaurantsTranslations, {as: 'translations', foreignKey: 'restaurantId'});
menuModel.belongsTo(userModel, {onDelete: 'cascade', foreignKey: 'userId'});

restaurantModel.belongsToMany(menuModel, {through: restaurantMenuModel});
menuModel.belongsToMany(restaurantModel, {through: restaurantMenuModel});
categoryModel.belongsTo(userModel, {onDelete: 'cascade', foreignKey: 'userId'});

userModel.sync();
restaurantModel.sync();
restaurantsLanguages.sync();
restaurantsTranslations.sync();
categoryModel.sync();
menuModel.sync();
restaurantMenuModel.sync();
menuCategoryModel.sync();

exports.getUserModel = function() {
  return userModel;
};

exports.getRestaurantModel = function() {
  return restaurantModel;
};

exports.getCategoryModel = function() {
  return categoryModel;
};

exports.getMenuModel = function() {
  return menuModel;
};

exports.getRestaurantMenuModel = function() {
  return restaurantMenuModel;
};

exports.getmenuCategoryModel = function() {
  return menuCategoryModel;
};

exports.getRestaurantsLanguageModel = function () {
  return restaurantsLanguages;
}

exports.getRestaurantsTranslationModel = function () {
	return restaurantsTranslations;
}
