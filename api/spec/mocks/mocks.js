var userModel = {};
var restaurantModel = {};
var businessHoursModel = {};
var menuModel = {};
var restaurantMenuModel = {};
var restaurantsLanguageModel = {};
var restaurantsTranslationModel = {};
var itemModel = {};
var itemSizesModel = {};

var Promise = require('promise');

userModel.create = create;
userModel.findOne = findOne_user;

restaurantModel.create = create;
restaurantModel.update = update;
restaurantModel.findAll = findAll;
restaurantModel.findOne = findOne;
restaurantModel.destroy = destroy;

businessHoursModel.create = create;
businessHoursModel.update = update;
businessHoursModel.findAll = findAll;
businessHoursModel.findOne = findOne;
businessHoursModel.destroy = destroy;

menuModel.create = create;
menuModel.update = update;
menuModel.findAll = findAll;
menuModel.findOne = findOne;
menuModel.destroy = destroy;

restaurantMenuModel.create = create;
restaurantMenuModel.destroy = destroy;

restaurantsLanguageModel.create = create;
restaurantsLanguageModel.update = update;
restaurantsLanguageModel.findAll = findAll;
restaurantsLanguageModel.destroy = destroy;

restaurantsTranslationModel.create = create;
restaurantsTranslationModel.update = update;
restaurantsTranslationModel.findAll = findAll;
restaurantsTranslationModel.destroy = destroy;

addMethodsToObject(itemModel);
addMethodsToObject(itemSizesModel);

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
  return restaurantModel;
}

exports.getBusinessHoursModel = function () {
  return businessHoursModel;
}

exports.getMenuModel = function () {
  return menuModel;
}

exports.getRestaurantMenuModel = function () {
  return restaurantMenuModel;
}

exports.getRestaurantsLanguageModel = function () {
  return restaurantsLanguageModel;
}

exports.getRestaurantsTranslationModel = function () {
  return restaurantsTranslationModel;
}

exports.getItemModel = function () {
  return itemModel;
}

exports.getItemSizesModel = function () {
  return itemSizesModel;
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
