var model = require('./models');
var passwordHasher = require("../api/helpers/passwordHash.js");
var passwordData = passwordHasher.saltHashPassword('password');
var _ = require('lodash');
var promise = require('promise');
var users = [
  {
    "firstName": "Harley",
    "lastName": "McPhee",
    "email": "harley.1011@gmail.com",
    "password": passwordData.passwordHash,
    "employeePassword": passwordData.passwordHash,
    "salt": passwordData.salt,
    "employeeSalt": passwordData.salt,
    "emailVerified": true,
    "supportedLanguages": [
      {
        "name": "English",
        "languageCode": "en"
      }, {
        "name": "French",
        "languageCode": "fr"
      }]
  }, {
    "firstName": "David",
    "lastName": "Bastien",
    "email": "david.bastien5@gmail.com",
    "password": passwordData.passwordHash,
    "salt": passwordData.salt,
    "emailVerified": true,
    "supportedLanguages": [
      {
        "name": "English",
        "languageCode": "en"
      }]
  }, {
   firstName: 'hilary',
   lastName: 'chan',
   email: 'hilary@restotouch.com',
   phoneNumber: '514 514 4444',
   password: passwordData.passwordHash,
   salt: passwordData.salt,
   emailVerified: true
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

var drinkCategory = {
  "translations": [
    {
      "name": "Drinks",
      "languageCode": "en"
    }
  ]
};

var mealCategory = {
  "translations": [
    {
      "name": "Meals",
      "languageCode": "en"
    }
  ]
};

var sideCategory = {
  "translations": [
    {
      "name": "Sides",
      "languageCode": "en"
    }
  ]
};


var mainMenu = {
  "translations": [
    {
      "name": "General Menu",
      "languageCode": "en"
    }
  ]
};

var restaurants = [
  {
    "address": "Burger Street",
    "kitCashModeFlag": "cnk",
    "paypalId": "2322323kjh",
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
        "languageCode": "en",
        "kitCashModeFlag": "kco"
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

var commonSizes = [
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
    "price": 2.50
  },
  {
    "translations": [
      {
        "languageCode": "en",
        "name": "Large"
      }
    ],
    "price": 3
  }
]
var drinkItems = [{
  "translations": [
    {
      "languageCode": "en",
      "name": "Pepsi",
      "description": "A classic refreshing soda"
    }
  ],
  "imageUrl": "https://s3.amazonaws.com/resto-item-images-static/703f4587-144f-47c3-a818-5b21dd1eab74",
  "sizes": commonSizes
},
  {
    "translations": [
      {
        "languageCode": "en",
        "name": "Coke",
        "description": "A classic refreshing soda"
      },
      {
        "languageCode": "fr",
        "name": "Coke",
        "description": "Une soude rafraîchissante classique"
      }
    ],
    "imageUrl": "https://s3.amazonaws.com/resto-item-images-static/c6ce062f-9a2c-43ce-926c-7e293d043e92",
    "sizes": commonSizes
  },
  {
    "translations": [
      {
        "languageCode": "en",
        "name": "Sprite",
        "description": "A classic refreshing soda"
      }
    ],
    "imageUrl": "https://s3.amazonaws.com/resto-item-images-static/65c5fba3-7c39-44cf-8e85-b93e0047d8ff",
    "sizes": commonSizes
  },
  {
    "translations": [
      {
        "languageCode": "en",
        "name": "Water",
        "description": "A classic refreshing soda"
      }
    ],
    "imageUrl": "https://s3.amazonaws.com/resto-item-images-static/b1b71c27-f271-44d9-9dd5-6e983fec1c2a",
    "sizes": commonSizes
  }

];


var sideItems = [{
  "translations": [
    {
      "languageCode": "en",
      "name": "Fries",
      "description": "Deep fried taters"
    }
  ],
  "imageUrl": "https://s3.amazonaws.com/resto-item-images-static/a4ae8968-38c0-4c1b-84c4-73bad88ccb4f",
  "sizes": commonSizes
},
  {
    "translations": [
      {
        "languageCode": "en",
        "name": "Chicken Wings",
        "description": "Some delicious chicken"
      }
    ],
    "imageUrl": "https://s3.amazonaws.com/resto-item-images-static/635050d6-d03a-4799-a729-76c41db1a80d",
    "sizes": commonSizes
  }
]

var mealItems = [{
  "translations": [
    {
      "languageCode": "en",
      "name": "Burger",
      "description": "Yummy burger"
    }
  ],
  "categories": [],
  "ingredientGroups": [
    {
      "maxNumberOfIngredients": 1,
      "minNumberOfIngredients": 1,
      "orderPriority": 1,
      "ingredients": [{
        "addByDefault": true,
        "price": 0,
        "allowQuantity": 1,
        "translations": [
          {
            "languageCode": "en",
            "name": "White Bread"
          }]
      },
        {
          "addByDefault": false,
          "price": 0,
          "allowQuantity": 1,
          "translations": [
            {
              "languageCode": "en",
              "name": "Brown Bread"
            }]
        },
        {
          "addByDefault": false,
          "price": .50,
          "allowQuantity": 1,
          "translations": [
            {
              "languageCode": "en",
              "name": "Sesame Bread"
            }]
        }
      ],
      "translations": [
        {
          "languageCode": "en",
          "name": "Bread"
        }]

    },
    {
      "maxNumberOfIngredients": 3,
      "minNumberOfIngredients": 1,
      "orderPriority": 2,
      "ingredients": [{
        "addByDefault": true,
        "price": 0,
        "allowQuantity": 1,
        "translations": [
          {
            "languageCode": "en",
            "name": "Lettuce"
          }]
      },
        {
          "addByDefault": false,
          "price": 1,
          "allowQuantity": 1,
          "translations": [
            {
              "languageCode": "en",
              "name": "Bacon"
            }]
        },
        {
          "addByDefault": false,
          "price": 0,
          "allowQuantity": 1,
          "translations": [
            {
              "languageCode": "en",
              "name": "Ketchup"
            }]
        },
        {
          "addByDefault": false,
          "price": 0,
          "allowQuantity": 1,
          "translations": [
            {
              "languageCode": "en",
              "name": "Mustard"
            }]
        }
      ],
      "translations": [
        {
          "languageCode": "en",
          "name": "Toppings"
        }]

    }
  ],
  "imageUrl": "https://s3.amazonaws.com/resto-item-images-static/fb12e1a2-3efb-4b71-ba44-d8f527f97592",
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
},
  {
    "translations": [
      {
        "languageCode": "en",
        "name": "Hot Dog",
        "description": "Hot Dogs"
      }
    ],
    "categories": [],
    "ingredientGroups": [
      {
        "maxNumberOfIngredients": 1,
        "minNumberOfIngredients": 1,
        "orderPriority": 1,
        "ingredients": [{
          "addByDefault": true,
          "price": 0,
          "allowQuantity": 1,
          "translations": [
            {
              "languageCode": "en",
              "name": "White Bun"
            }]
        },
          {
            "addByDefault": false,
            "price": 0,
            "allowQuantity": 1,
            "translations": [
              {
                "languageCode": "en",
                "name": "Brown Bun"
              }]
          },
          {
            "addByDefault": false,
            "price": .50,
            "allowQuantity": 1,
            "translations": [
              {
                "languageCode": "en",
                "name": "Sesame Bun"
              }]
          }
        ],
        "translations": [
          {
            "languageCode": "en",
            "name": "Bread"
          }]

      },
      {
        "maxNumberOfIngredients": 3,
        "minNumberOfIngredients": 1,
        "orderPriority": 2,
        "ingredients": [
          {
            "addByDefault": false,
            "price": 0,
            "allowQuantity": 1,
            "translations": [
              {
                "languageCode": "en",
                "name": "Ketchup"
              }]
          },
          {
            "addByDefault": false,
            "price": 0,
            "allowQuantity": 1,
            "translations": [
              {
                "languageCode": "en",
                "name": "Mustard"
              }]
          }
        ],
        "translations": [
          {
            "languageCode": "en",
            "name": "Toppings"
          }]

      }
    ],
    "imageUrl": "https://s3.amazonaws.com/resto-item-images-static/63cc3c4f-291f-48e7-b42c-7219634bfa98",
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
  }
];

var createdItemInstances = {};


// Let the db tables get created
setTimeout(function () {
  var menuModel = model.getMenuModel();
  var menuTranslationsModel = model.getMenuTranslationsModel();
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
  var orderModel = model.getOrdersModel();
  var orderedItemsModel = model.getOrderedItemsModel();
  var orderedItemIngredientModel = model.getOrderedItemIngredientModel();

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
        restaurantModel.create(restaurant, {include: [{
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
        }).then(function (createdRestaurant) {


          mainMenu.userId = user.id;
          menuModel.create(mainMenu, {
            include: [{
              model: menuTranslationsModel,
              as: 'translations'
            }]
          }).then(function (createdMenu) {
            createdRestaurant.addMenu(createdMenu);

            createCategoryAndThenItems(drinkCategory, createdMenu, drinkItems, user.id, 'drinks');

            createCategoryAndThenItems(mealCategory, createdMenu, mealItems, user.id, 'meals');

            createCategoryAndThenItems(sideCategory, createdMenu, sideItems, user.id, 'sides');

            //Wait 4 seconds for all the instances to be created, it's possible it might take longer
            setTimeout(function () {

              for (var i = 0; i < 100; i++) {

                var orderedItems = [];
                var orderTotal = 0;

                for (var prop in createdItemInstances) {
                  var itemTypeArray = createdItemInstances[prop];

                  // Pick different items
                  var itemToAdd = itemTypeArray[i % itemTypeArray.length];

                  // Add multiple sizes a few times
                  var sizesToAddNumber = Math.random() * 5;
                  for(var k = 0; k < sizesToAddNumber; k++) {
                    var sizeToAdd = itemToAdd.sizes[parseInt((Math.random() * 10 + 1)) % itemToAdd.sizes.length];
                    orderTotal += sizeToAdd.price;
                    orderedItems.push({itemId: itemToAdd.id, itemSizeId: sizeToAdd.id})
                  }
                }
                var paidDate = new Date(2015 + i % 2, i % 12, i % 26, i % 60, i % 60, 0, 0);
                orderModel.create({total: orderTotal, orderedItems: orderedItems, restaurantId: createdRestaurant.id, paymentId: "", createdAt: paidDate}, {
                  include: [{
                    model: orderedItemsModel, as: 'orderedItems', include: [{
                      model: orderedItemIngredientModel,
                      as: 'orderedItemIngredients'
                    }]
                  },
                  ]
                });
              }

            }, 2000)
          });
        });
      });
    });
  });


  function createCategoryAndThenItems(category, createdMenu, items, userId, addInstanceToArrayField) {
    category.userId = userId;
    return categoryModel.create(category, {
      include: [{
        model: categoryTranslationModel,
        as: 'translations'
      }]
    }).then(function (createdCategory) {
      createdMenu.addCategory(createdCategory);
      items.forEach(function (item) {
        createItem(item, userId).then(function (createdItem) {
          createdCategory.addItem(createdItem);
          if (!_.has(createdItemInstances, addInstanceToArrayField)) {
            createdItemInstances[addInstanceToArrayField] = [];
          }
          createdItemInstances[addInstanceToArrayField].push(createdItem);
        })
      })

    });
  }

  function createItem(item, userId) {
    item.userId = userId;
    return itemModel.create(item, {
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
    });
  }

}, 5000)


