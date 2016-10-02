var userModel = {}
var Promise = require('promise');
userModel.create = create;
userModel.findOne = findOne;


exports.getUserModel = function() {
  return userModel;
};


function create(object) {
  return new Promise(function (fulfill, reject){
      object.id = 100;
      fulfill({dataValues: object});
    });
}

function findOne(object) {
    return new Promise(function (fulfill, reject) {
      object.id = 100;
      object.email = "test123@sample.com";
      object.salt = 'salt';
      object.password = "1c8e432462648d825ade4983da4b1c9cc231180d3dd0e77b0cfe0b28c5e2f2b39aa3adabfcd5e1fe968b9e815005cf67499c30177f4c0199e39064ceaa5adefa";
      fulfill(object);
    });
}
