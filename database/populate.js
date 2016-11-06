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
var restaurantsLangs = [{name:'McDonald'}, {name:'BurgerKing'}, {name:'Rubens'}, {name:'Damas'}];
var restaurantsTrans = [{name:'McDonald', description:'Ordering burgers'}, {name:'BurgerKing', description:'Ordering burgers'}, {name:'Rubens', description:'Famous Steak'}, {name:'Damas', description:'Fresh food'}];
var restaurants = [{address:'1 Rue Notre-Dame O, Montréal, QC H2Y 1S5', mOpen:'9:00', mClose:'21:00', tuOpen:'9:00', tuClose:'21:00', wOpen:'9:00', wClose:'21:00', thOpen:'9:00', thClose:'21:00', fOpen:'9:00', fClose:'21:00', saOpen:'9:00', saClose:'21:00', suOpen:'9:00', suClose:'21:00'},
                   {address:'Sainte-Catherine', mOpen:'9:00', mClose:'21:00', tuOpen:'9:00', tuClose:'21:00', wOpen:'9:00', wClose:'21:00', thOpen:'9:00', thClose:'21:00', fOpen:'9:00', fClose:'21:00', saOpen:'9:00', saClose:'21:00', suOpen:'9:00', suClose:'21:00'},
                   {address:'Centre Eaton de Montréal, 977 Rue Sainte-Catherine O, Montréal, QC H3B 4W3', mOpen:'9:00', mClose:'21:00', tuOpen:'9:00', tuClose:'21:00', wOpen:'9:00', wClose:'21:00', thOpen:'9:00', thClose:'21:00', fOpen:'9:00', fClose:'21:00', saOpen:'9:00', saClose:'21:00', suOpen:'9:00', suClose:'21:00'},
                   {address:'Crescent Street Montréal, H3G 2B2', mOpen:'9:00', mClose:'21:00', tuOpen:'9:00', tuClose:'21:00', wOpen:'9:00', wClose:'21:00', thOpen:'9:00', thClose:'21:00', fOpen:'9:00', fClose:'21:00', saOpen:'9:00', saClose:'21:00', suOpen:'9:00', suClose:'21:00'}];


// Let the db tables get created
setTimeout(function () {
  var menuModel = model.getMenuModel();
  var userModel = model.getUserModel();
  var categoryModel = model.getCategoryModel();
  var restaurantsLanguagesModel = model.getRestaurantsLanguageModel();
  var restaurantsTranslationsModel = model.getRestaurantsTranslationModel();
  var restaurantModel = model.getRestaurantModel();


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

      restaurantsLangs.forEach(function (restaurantsLang) {
        //TODO
        restaurantsLangs.findOrCreate({where: restaurantsLang, defaults: restaurantsLang});
      });

      restaurantsTrans.forEach(function (restaurantsTrs){
        //TODO
        restaurantsLangs.findOrCreate({where: restaurantsTrs, defaults: restaurantsTrs})
      });

      restaurants.forEach(function (restaurant) {
        restaurant.userId = user.id;
        restaurantModel.findOrCreate({where: restaurant, defaults: restaurant});
      });
    });
  });


}, 5000)


