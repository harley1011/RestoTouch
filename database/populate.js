var model = require('./models');
var passwordHasher = require("../api/helpers/passwordHash.js");
var passwordData = passwordHasher.saltHashPassword('password');

var users = [{
  firstName: 'harley',
  lastName: 'mcphee',
  email: 'harley@gmail.com',
  phoneNumber: '514 514 1111',
  password: passwordData.passwordHash,
  salt: passwordData.salt
},
  {
    firstName: 'david',
    lastName: 'bastien',
    email: 'davidbastien@gmail.com',
    phoneNumber: '514 514 2222',
    password: passwordData.passwordHash,
    salt: passwordData.salt,
    emailVerified: true
  },
  {
    firstName: 'tamy',
    lastName: 'huynh',
    email: 'tamyhuynh@gmail.com',
    phoneNumber: '514 514 3333',
    password: passwordData.passwordHash,
    salt: passwordData.salt,
    emailVerified: true
  },
  {
    firstName: 'hilary',
    lastName: 'chan',
    email: 'hilary@gmail.com',
    phoneNumber: '514 514 4444',
    password: passwordData.passwordHash,
    salt: passwordData.salt,
    emailVerified: true
  },
  {
    firstName: 'alex',
    lastName: 'pelletier',
    email: 'alex@gmail.com',
    phoneNumber: '514 514 5555',
    password: passwordData.passwordHash,
    salt: passwordData.salt,
    emailVerified: true
  },

  {
    firstName: 'samer',
    lastName: 'elachkar',
    email: 'samer@gmail.com',
    phoneNumber: '514 514 6666',
    password: passwordData.passwordHash,
    salt: passwordData.salt,
    emailVerified: true
  }];

var menus = [{name: 'breakfast1 Menu'}, {name: 'dinner1 Menu'}];

var categories = [{categoryName:'Burgers'}, {categoryName:'Sandwiches'}, {categoryName:'Drinks'}, {categoryName:'Sweets'}];

// Let the db tables get created
setTimeout(function () {
  var menuModel = model.getMenuModel();
  var userModel = model.getUserModel();
  var categoryModel = model.getCategoryModel();

  users.forEach(function (user) {

    userModel.findOrCreate({
      where: {
        email: user.email
      },
      defaults: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        password: user.password,
        salt: user.salt,
        emailVerified: true
      }
    }).then(function (result) {
      var user = result[0];//[object SequelizeInstance:Users]

      menus.forEach(function (menu) {
        menu.userId = user.id;
        menuModel.findOrCreate({where: menu, defaults: menu});
      });

      categories.forEach(function (category) {
        category.userId = user.id;
        categoryModel.findOrCreate({where: category, defaults: category});
      });
    });
  });


}, 5000)


