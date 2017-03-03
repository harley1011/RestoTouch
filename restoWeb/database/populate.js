var model = require('./models');
var passwordHasher = require("../api/helpers/passwordHash.js");
var passwordData = passwordHasher.saltHashPassword('password');

var users = [
  {
    "firstName": "Harley",
    "lastName": "McPhee",
    "email": "harley.1011@gmail.com",
    "password": passwordData.passwordHash,
    "salt": passwordData.salt,
    "emailVerified": true,
    "supportedLanguages": [
      {
        "name": "English",
        "languageCode": "en"
      }]
  }];
// },
//
// {
//   firstName: 'tamy',
//   lastName: 'huynh',
//   email: 'tamyhuynh@gmail.com',
//   phoneNumber: '514 514 3333',
//   password: passwordData.passwordHash,
//   salt: passwordData.salt,
//   emailVerified: true
// },
// {
//   firstName: 'hilary',
//   lastName: 'chan',
//   email: 'hilary@gmail.com',
//   phoneNumber: '514 514 4444',
//   password: passwordData.passwordHash,
//   salt: passwordData.salt,
//   emailVerified: true
// },
// {
//   firstName: 'alex',
//   lastName: 'pelletier',
//   email: 'alex@gmail.com',
//   phoneNumber: '514 514 5555',
//   password: passwordData.passwordHash,
//   salt: passwordData.salt,
//   emailVerified: true
// },
//
// {
//   firstName: 'samer',
//   lastName: 'elachkar',
//   email: 'samer@gmail.com',
//   phoneNumber: '514 514 6666',
//   password: passwordData.passwordHash,
//   salt: passwordData.salt,
//   emailVerified: true
// }


var menus = [{name: 'breakfast1 Menu'}, {name: 'dinner1 Menu'}];
var categories = [{
  "translations": [
    {
      "name": "Drinks",
      "languageCode": "en"
    }
  ],
  "items": [
    {
      "id": 1
    },
    {
      "id": 2
    }]
}];

var restaurantsLangs = [{name: 'McDonald'}, {name: 'BurgerKing'}, {name: 'Rubens'}, {name: 'Damas'}];
var restaurantsTrans = [{name: 'McDonald', description: 'Ordering burgers'}, {
  name: 'BurgerKing',
  description: 'Ordering burgers'
}, {name: 'Rubens', description: 'Famous Steak'}, {name: 'Damas', description: 'Fresh food'}];
var restaurants = [
  {
    "address": "Burger Street",
    "supportedLanguages": [
      {
        "languageCode": "en",
        "name": "English",
        "userId": 1
      }
    ],
    "translations": [
      {
        "name": "Burger King",
        "description": "Burgersss",
        "languageCode": "en"
      }
    ],
    "Menus": [],
    "payments": [
      {
        "name": "Cash",
        "used": true
      },
      {
        "name": "Debit",
        "used": false
      },
      {
        "name": "Credit",
        "used": false
      }
    ],
    "businessHours": [
      {
        "day": 0,
        "shift": 0,
        "openTime": "9:00",
        "closeTime": "21:00",
        "active": false
      },
      {
        "day": 0,
        "shift": 1,
        "openTime": "9:00",
        "closeTime": "21:00",
        "active": false
      },
      {
        "day": 1,
        "shift": 0,
        "openTime": "9:00",
        "closeTime": "21:00",
        "active": false
      },
      {
        "day": 1,
        "shift": 1,
        "openTime": "9:00",
        "closeTime": "21:00",
        "active": false
      },
      {
        "day": 2,
        "shift": 0,
        "openTime": "9:00",
        "closeTime": "21:00",
        "active": false
      },
      {
        "day": 2,
        "shift": 1,
        "openTime": "9:00",
        "closeTime": "21:00",
        "active": false
      },
      {
        "day": 3,
        "shift": 0,
        "openTime": "9:00",
        "closeTime": "21:00",
        "active": false
      },
      {
        "day": 3,
        "shift": 1,
        "openTime": "9:00",
        "closeTime": "21:00",
        "active": false
      },
      {
        "day": 4,
        "shift": 0,
        "openTime": "9:00",
        "closeTime": "21:00",
        "active": false
      },
      {
        "day": 4,
        "shift": 1,
        "openTime": "9:00",
        "closeTime": "21:00",
        "active": false
      },
      {
        "day": 5,
        "shift": 0,
        "openTime": "9:00",
        "closeTime": "21:00",
        "active": false
      },
      {
        "day": 5,
        "shift": 1,
        "openTime": "9:00",
        "closeTime": "21:00",
        "active": false
      },
      {
        "day": 6,
        "shift": 0,
        "openTime": "9:00",
        "closeTime": "21:00",
        "active": false
      },
      {
        "day": 6,
        "shift": 1,
        "openTime": "9:00",
        "closeTime": "21:00",
        "active": false
      }
    ],

  }
];
var items = [{
  "translations": [
    {
      "languageCode": "en",
      "name": "Burger",
      "description": "Yummy burger"
    }
  ],
  "categories": [],
  "ingredientGroups": [],
  "imageUrl": "",
  "sizes": [
    {
      "translations": [
        {
          "languageCode": "en",
          "name": "Regular"
        }
      ],
      "price": 2
    }
  ]
}, {
  "translations": [
    {
      "languageCode": "en",
      "name": "Soda",
      "description": "A sugary drink"
    }
  ],
  "categories": [],
  "ingredientGroups": [],
  "imageUrl": "",
  "sizes": [
    {
      "translations": [
        {
          "languageCode": "en",
          "name": "Small"
        }
      ],
      "price": 2
    },
    {
      "translations": [
        {
          "languageCode": "en",
          "name": "Medium"
        }
      ],
      "price": 3
    },
    {
      "translations": [
        {
          "languageCode": "en",
          "name": "Large"
        }
      ],
      "price": 4.50
    },
  ]
},
  {
    "translations": [
      {
        "languageCode": "en",
        "name": "Fries",
        "description": "Deep fried taters"
      }
    ],
    "categories": [],
    "ingredientGroups": [],
    "imageUrl": "",
    "sizes": [
      {
        "translations": [
          {
            "languageCode": "en",
            "name": "Small"
          }
        ],
        "price": 1
      },
      {
        "translations": [
          {
            "languageCode": "en",
            "name": "Medium"
          }
        ],
        "price": 2
      },
      {
        "translations": [
          {
            "languageCode": "en",
            "name": "Large"
          }
        ],
        "price": 3.50
      },
    ]
  }];


// Let the db tables get created
setTimeout(function () {
  var menuModel = model.getMenuModel();
  var userModel = model.getUserModel();
  var categoryModel = model.getCategoryModel();
  var restaurantsLanguagesModel = model.getRestaurantsLanguageModel();
  var restaurantsTranslationsModel = model.getRestaurantsTranslationModel();
  var supportedLanguageModel = model.getSupportedLanguageModel();
  var restaurantModel = model.getRestaurantModel();
  var restaurantLanguageModel = model.getRestaurantsLanguageModel();
  var restaurantsTranslations = model.getRestaurantsTranslationModel();
  var businessHoursModel = model.getBusinessHoursModel();
  var paymentsModel = model.getPaymentsModel();
  var itemModel = model.getItemModel();
  var itemSizeModel = model.getItemSizesModel();
  var itemSizeTranslationModel = model.getItemSizeTranslationsModel();
  var itemTranslationModel = model.getItemTranslationModel();
  var ingredientGroupModel = model.getIngredientGroupModel();
  var ingredientModel = model.getIngredientModel();
  var ingredientTranslationModel = model.getIngredientTranslationModel();
  var ingredientGroupTranslationModel = model.getIngredientGroupTranslationModel();
  var categoryTranslationModel = model.getCategoryTranslationModel();

  users.forEach(function (user) {

    userModel.findOrCreate({
      where: {
        email: user.email
      },
      include: [{
        model: supportedLanguageModel,
        as: 'supportedLanguages'
      }],
      defaults: user
    }).then(function (result) {
      var user = result[0];//[object SequelizeInstance:Users]

      restaurants.forEach(function (restaurant) {
        restaurant.userId = user.id;
        restaurantModel.findOrCreate({
          where: {address: restaurant.address}, include: [{
            model: restaurantLanguageModel,
            as: 'supportedLanguages'
          }, {
            model: restaurantsTranslations,
            as: 'translations'
          }, {
            model: businessHoursModel,
            as: 'businessHours'
          }, {
            model: paymentsModel,
            as: 'payments'
          }], defaults: restaurant
        }).then(function () {


          var createdItem = [];
          items.forEach(function (item) {
            item.userId = user.id;
            itemModel.create(item, {
              include: [{
                model: itemSizeModel,
                as: 'sizes',
                include: [{
                  model: itemSizeTranslationModel,
                  as: 'translations'
                }]
              }, {
                model: itemTranslationModel,
                as: 'translations'
              }, {
                model: ingredientGroupModel,
                as: 'ingredientGroups',
                include: [{
                  model: ingredientModel,
                  as: 'ingredients',
                  include: [{
                    model: ingredientTranslationModel,
                    as: 'translations'
                  }]
                }, {
                  model: ingredientGroupTranslationModel,
                  as: 'translations'
                }]
              }]
            }).then(function (result) {
              createdItem.push(result);

            });
          });


          setTimeout(function () {
            categories.forEach(function (category) {
              categoryModel.create(category, {
                include: [{
                  model: categoryTranslationModel,
                  as: 'translations'
                }]
              }).then(function (result) {

              })

            });

          }, 5000)

        });
      });
    });
  });


}, 5000)


