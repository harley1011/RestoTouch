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

// Let the db tables get created
setTimeout(function () {
  var menuModel = model.getMenuModel();
  var userModel = model.getUserModel();


  users.forEach(function (user) {

    userModel.findOrCreate({where: {
      email: user.email}, defaults: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
      salt: user.salt,
      emailVerified: true}
    }).then(function (result) {
      var user = result[0];
      menuModel.create({name: 'breakfast1 Menu', userId: user.id}).then(function (menu) {
        console.log(menu);
      });
    });
  });


}, 5000)


