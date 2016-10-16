var Sequelize = require('sequelize');
var configDB = require('../config/database.js');
var sequelize = new Sequelize(configDB.url);
var userModel = sequelize.import('./models/users.js');
var restaurantModel = sequelize.import('./models/restaurants.js');
var menuModel = sequelize.import('./models/menus.js');
var restaurantMenuModel = sequelize.import('./models/restaurantMenu.js');
var menuCategoryModel = sequelize.import('./models/menuCategory.js');
var categoryModel = sequelize.import('./models/categories.js');
var restaurantsLanguages = sequelize.import('./models/restaurantsLanguages.js');
var restaurantsTranslations = sequelize.import('./models/restaurantsTranslations.js');

// Enable this if you want to drop all tables and create them
var dropTable = false;

menuModel.belongsToMany(categoryModel, {through: menuCategoryModel});
categoryModel.belongsToMany(menuModel, {through: menuCategoryModel});


restaurantModel.belongsTo(userModel, {onDelete: 'cascade', foreignKey: 'userId'});
restaurantModel.hasMany(restaurantsLanguages, {as: 'supportedLanguages', foreignKey: 'restaurantId'});
restaurantModel.hasMany(restaurantsTranslations, {as: 'translations', foreignKey: 'restaurantId'});
menuModel.belongsTo(userModel, {onDelete: 'cascade', foreignKey: 'userId'});

restaurantModel.belongsToMany(menuModel, {through: restaurantMenuModel});
menuModel.belongsToMany(restaurantModel, {through: restaurantMenuModel});
categoryModel.belongsTo(userModel, {onDelete: 'cascade', foreignKey: 'userId'});

userModel.sync({force: dropTable});
restaurantModel.sync({force: dropTable});
restaurantsLanguages.sync({force: dropTable});
restaurantsTranslations.sync({force: dropTable});
categoryModel.sync({force: dropTable});
menuModel.sync({force: dropTable});
restaurantMenuModel.sync({force: dropTable});
menuCategoryModel.sync({force: dropTable});

exports.getUserModel = function () {
  return userModel;
};

exports.getRestaurantModel = function () {
  return restaurantModel;
};

exports.getCategoryModel = function () {
  return categoryModel;
};

exports.getMenuModel = function () {
  return menuModel;
};

exports.getRestaurantMenuModel = function () {
  return restaurantMenuModel;
};

exports.getmenuCategoryModel = function () {
  return menuCategoryModel;
};

exports.getRestaurantsLanguageModel = function () {
  return restaurantsLanguages;
}

exports.getRestaurantsTranslationModel = function () {
  return restaurantsTranslations;
}
