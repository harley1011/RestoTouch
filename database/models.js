var Sequelize = require('sequelize');
var configDB = require('../config/database.js');
var sequelize = new Sequelize(configDB.url, {logging: true});
var userModel = sequelize.import('./models/users.js');
var restaurantModel = sequelize.import('./models/restaurants.js');
var businessHoursModel = sequelize.import('./models/businessHours.js');
var paymentsModel = sequelize.import('./models/payments.js');
var menuModel = sequelize.import('./models/menus.js');
var menuLanguageModel = sequelize.import('./models/menusLanguages.js');
var menuTranslationsModel = sequelize.import('./models/menuTranslations');
var restaurantMenuModel = sequelize.import('./models/restaurantMenu.js');
var menuCategoryModel = sequelize.import('./models/menuCategory.js');
var categoryModel = sequelize.import('./models/categories.js');
var restaurantsLanguagesModel = sequelize.import('./models/restaurantsLanguages.js');
var restaurantsTranslationsModel = sequelize.import('./models/restaurantsTranslations.js');
var itemModel = sequelize.import('./models/items.js');
var itemSizesModel = sequelize.import('./models/itemSizes.js');
var itemLanguageModel = sequelize.import('./models/itemsLanguages.js');
var itemTranslationModel = sequelize.import('./models/itemsTranslations.js');

// Enable this if you want to drop all tables and create them,
// DO NOT COMMIT THIS AS TRUE THOUGH
var dropTable = true;

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

    restaurantModel.hasMany(paymentsModel, {
      as: 'payments',
      onDelete: 'cascade',
      foreignKey: 'restaurantId'
    });
    paymentsModel.sync({force: dropTable});
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

    menuModel.hasMany(menuLanguageModel, {
      as: 'supportedLanguages',
      onDelete: 'cascade',
      foreignKey: 'menuId'
    });
    menuLanguageModel.sync({force: dropTable});

    menuModel.hasMany(menuTranslationsModel, {
      as: 'translations',
      onDelete: 'cascade',
      foreignKey: 'menuId'
    });
    menuTranslationsModel.sync({force: dropTable});

    menuModel.belongsToMany(categoryModel, {through: menuCategoryModel, foreignKey: 'menuId'});
    categoryModel.belongsToMany(menuModel, {through: menuCategoryModel, foreignKey: 'categoryId'});
    menuCategoryModel.sync({force: dropTable});

  });

  userModel.hasMany(itemModel, {as: 'items', onDelete: 'cascade', foreignKey: 'userId'});

  itemModel.sync({force: dropTable}).then(function () {
    itemModel.hasMany(itemSizesModel, {as: 'sizes', onDelete: 'cascade', foreignKey: 'itemId'});
    itemSizesModel.sync({force: dropTable});
    itemModel.hasMany(itemLanguageModel, {as: 'supportedLanguages', onDelete: 'cascade', foreignKey: 'itemId'});
    itemLanguageModel.sync({force: dropTable});
    itemModel.hasMany(itemTranslationModel, {as: 'translations', onDelete: 'cascade', foreignKey: 'itemId'});
    itemTranslationModel.sync({force: dropTable});
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

exports.getMenuLanguageModel = function () {
  return menuLanguageModel;
};

exports.getMenuTranslationsModel = function () {
  return menuTranslationsModel;
}

exports.getRestaurantMenuModel = function () {
  return restaurantMenuModel;
};

exports.getmenuCategoryModel = function () {
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

exports.getPaymentsModel = function () {
  return paymentsModel;
}

exports.getItemModel = function () {
  return itemModel;
}

exports.getItemSizesModel = function () {
  return itemSizesModel;
}

exports.getItemLanguageModel = function () {
  return itemLanguageModel;
}

exports.getItemTranslationModel = function () {
  return itemTranslationModel;
}
