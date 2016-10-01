var userModel = {}
var restaurantModel = {}
var Promise = require('promise');
userModel.create = create;
restaurantModel.create = create;
restaurantModel.update = update;
restaurantModel.findAll = findAll;
restaurantModel.findOne = findOne;
restaurantModel.destroy = destroy;


exports.getUserModel = function() {
  return userModel;
};

exports.getRestaurantModel = function () {
  return restaurantModel;
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

function destroy(options) {
  return new Promise(function (fulfill, reject) {
    //returns the number of rows affected
    fulfill(1);
  });
}
