var userModel = {};
var mockedSequelizeObject = {};

var Promise = require('promise');

userModel.create = create;
userModel.findOne = findOne_user;

addMethodsToObject(mockedSequelizeObject);

function addMethodsToObject(obj) {
  obj.create = create;
  obj.update = update;
  obj.findAll = findAll;
  obj.findOne = findOne;
  obj.destroy = destroy;
}

exports.getUserModel = function() {
  return userModel;
};

exports.getRestaurantModel = function () {
  return mockedSequelizeObject;
}

exports.getBusinessHoursModel = function () {
  return mockedSequelizeObject;
}

exports.getPaymentsModel = function () {
  return mockedSequelizeObject;
}

exports.getMenuModel = function () {
  return mockedSequelizeObject;
}

exports.getMenuLanguageModel = function () {
  return mockedSequelizeObject;
}

exports.getMenuTranslationsModel = function () {
  return mockedSequelizeObject;
}

exports.getMenuCategoryModel = function () {
    return mockedSequelizeObject;
}

exports.getRestaurantMenuModel = function () {
  return mockedSequelizeObject;
}

exports.getRestaurantsLanguageModel = function () {
  return mockedSequelizeObject;
}

exports.getRestaurantsTranslationModel = function () {
  return mockedSequelizeObject;
}

exports.getItemModel = function () {
  return mockedSequelizeObject;
}

exports.getItemSizesModel = function () {
  return mockedSequelizeObject;
}

exports.getItemTranslationModel = function () {
  return mockedSequelizeObject;
}

exports.getIngredientGroupModel  = function () {
  return mockedSequelizeObject;
}

exports.getIngredientModel = function () {
  return mockedSequelizeObject;
}

exports.getSupportedLanguageModel = function () {
  return mockedSequelizeObject;
}

exports.getCategoryModel = function () {
  return mockedSequelizeObject;
}

exports.getCategoryTranslationModel = function () {
  return mockedSequelizeObject;
}

exports.getItemCategoryModel = function () {
  return mockedSequelizeObject;
}

exports.getDisabledMenuItemCategoryModel = function () {
  return mockedSequelizeObject;
}

exports.getItemSizeTranslationsModel = function () {
  return mockedSequelizeObject;
}

exports.getIngredientGroupTranslationModel = function () {
  return mockedSequelizeObject;
}

exports.getIngredientTranslationModel = function () {
  return mockedSequelizeObject;
}

function create(object) {
  return new Promise(function (fulfill, reject) {
    object.id = 100;
    fulfill({dataValues: object});
  });
}

function update(object, options) {
  return new Promise(function (fulfill, reject) {
    //returns an array containing the number of affected rows
    fulfill([1]);
  })
}

function findAll(options) {
  return new Promise(function (fulfill, reject) {
    var object = {};
    if (options && options.where) {
      var where = options.where;

      for (var key in where) {
        object[key] = where[key];
      }
    }

    //returns an array of objects
    fulfill([object]);
  });
}

function findOne(options) {
  return new Promise(function (fulfill, reject) {
    var object = {};
    if (options && options.where) {
      var where = options.where;

      for (var key in where) {
        object[key] = where[key];
      }
    }

    //returns object
    fulfill(object);
  });
}

function findOne_user(object) {
    return new Promise(function (fulfill, reject) {
      object.id = 100;
      object.email = "test123@sample.com";
      object.salt = 'salt';
      object.password = "1c8e432462648d825ade4983da4b1c9cc231180d3dd0e77b0cfe0b28c5e2f2b39aa3adabfcd5e1fe968b9e815005cf67499c30177f4c0199e39064ceaa5adefa";
      fulfill(object);
    });
}


function destroy(options) {
  return new Promise(function (fulfill, reject) {
    //returns the number of rows affected
    fulfill(1);
  });
}
