var Sequelize = require('sequelize');
var configDB = require('../config/database.js');
var sequelize = new Sequelize(configDB.url);
var userModel = sequelize.import('./models/users.js');

userModel.sync();

exports.getUserModel = function() {
  return userModel;
};
