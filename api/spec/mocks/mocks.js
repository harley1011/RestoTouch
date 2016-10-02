var userModel = {}
var restaurantModel = {}
var Promise = require('promise');
userModel.create = create;
userModel.findOne = findOne_user;

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