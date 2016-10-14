var Sequelize = require('sequelize');
var configDB = require('../config/database.js');
var sequelize = new Sequelize(configDB.url);
var userModel = sequelize.import('./models/users.js');
var restaurantModel = sequelize.import('./models/restaurants.js');
var restaurantsLanguages = sequelize.import('./models/restaurantsLanguages.js');
var restaurantsTranslations = sequelize.import('./models/restaurantsTranslations.js');


restaurantModel.belongsTo(userModel, {onDelete: 'cascade', foreignKey: 'userId'});
restaurantModel.hasMany(restaurantsLanguages, {as: 'supportedLanguages', foreignKey: 'restaurantId'});
restaurantModel.hasMany(restaurantsTranslations, {as: 'translations', foreignKey: 'restaurantId'});

userModel.sync();
restaurantModel.sync({force: true});
restaurantsLanguages.sync({force: true});
restaurantsTranslations.sync({force: true});

exports.getUserModel = function() {
  return userModel;
};

exports.getRestaurantModel = function() {
  return restaurantModel;
};

exports.getRestaurantsLanguageModel = function () {
  return restaurantsLanguages;
}

exports.getRestaurantsTranslationModel = function () {
	return restaurantsTranslations;
}
