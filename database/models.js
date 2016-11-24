var Sequelize = require('sequelize');
var configDB = require('../config/database.js');
var sequelize = new Sequelize(configDB.url, {logging: false});
var userModel = sequelize.import('./models/users.js');
var restaurantModel = sequelize.import('./models/restaurants.js');
var businessHoursModel = sequelize.import('./models/businessHours.js');
var menuModel = sequelize.import('./models/menus.js');
var restaurantMenuModel = sequelize.import('./models/restaurantMenu.js');
var menuCategoryModel = sequelize.import('./models/menuCategory.js');
var categoryModel = sequelize.import('./models/categories.js');
var restaurantsLanguagesModel = sequelize.import('./models/restaurantsLanguages.js');
var restaurantsTranslationsModel = sequelize.import('./models/restaurantsTranslations.js');
var itemModel = sequelize.import('./models/items.js');
var itemSizesModel = sequelize.import('./models/itemSizes.js');

// Enable this if you want to drop all tables and create them,
// DO NOT COMMIT THIS AS TRUE THOUGH
var dropTable = false;

userModel.sync({force: dropTable}).then(function () {

  // User has to be created before these tables are created
  userModel.hasMany(restaurantModel, {as: 'restaurants', onDelete: 'cascade', foreignKey: 'userId'});

  restaurantModel.sync({force: dropTable}).then(function () {
    //Restaurant has to be created before these tables are created

    restaurantModel.hasMany(restaurantsLanguagesModel, {
      as: 'supportedLanguages',
      onDelete: 'cascade',
      foreignKey: 'restaurantId'
    });
    restaurantsLanguagesModel.sync({force: dropTable});

    restaurantModel.hasMany(restaurantsTranslationsModel, {
      as: 'translations',
      onDelete: 'cascade',
      foreignKey: 'restaurantId'
    });
    restaurantsTranslationsModel.sync({force: dropTable});

    restaurantModel.hasMany(businessHoursModel, {
      as: 'businessHours',
      onDelete: 'cascade',
      foreignKey: 'restaurantId'
    });
    businessHoursModel.sync({force: dropTable});
  });

  categoryModel.belongsTo(userModel, {onDelete: 'cascade', foreignKey: 'userId'});
  categoryModel.sync({force: dropTable});

  menuModel.belongsTo(userModel, {onDelete: 'cascade', foreignKey: 'userId'});
  menuModel.sync({force: dropTable}).then(function () {

    restaurantModel.belongsToMany(menuModel, {
      through: restaurantMenuModel,
      onDelete: 'cascade',
      foreignKey: "restaurantId"
    });
    menuModel.belongsToMany(restaurantModel, {
      through: restaurantMenuModel,
      onDelete: 'cascade',
      foreignKey: "menuId"
    });
    restaurantMenuModel.sync({force: dropTable});

    menuModel.belongsToMany(categoryModel, {through: menuCategoryModel, foreignKey: 'menuId'});
    categoryModel.belongsToMany(menuModel, {through: menuCategoryModel, foreignKey: 'categoryId'});
    menuCategoryModel.sync({force: dropTable});

  });

  userModel.hasMany(itemModel, {as: 'items', onDelete: 'cascade', foreignKey: 'userId'});

  itemModel.sync({force: dropTable}).then(function () {
    itemModel.hasMany(itemSizesModel, {as: 'sizes', onDelete: 'cascade', foreignKey: 'itemId'});
    itemSizesModel.sync({force: dropTable});
  })


});


exports.connectToDb = function () {

}

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

exports.getMenuCategoryModel = function () {
  return menuCategoryModel;
};

exports.getRestaurantsLanguageModel = function () {
  return restaurantsLanguagesModel;
}

exports.getRestaurantsTranslationModel = function () {
  return restaurantsTranslationsModel;
}

exports.getBusinessHoursModel = function () {
  return businessHoursModel;
}

exports.getItemModel = function () {
  return itemModel;
}

exports.getItemSizesModel = function () {
  return itemSizesModel;
}
