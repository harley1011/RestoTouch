var item = require('../controllers/item');
var mocks = require('./mocks/mocks');

describe("The Item API", function () {

  var res = {
    json: function (obj) {
      res.obj = obj;

    },
    status: function (num) {
      res.statusCode = num;
    }
  };

  //Override models in restaurant so that we don't actually insert into the DB and we mock the database operations
  item.setDatabase(mocks);

  it("should create a valid item", function (done) {
    var req = {
      body: {
        "translations": [
          {
            "languageCode": "ar",
            "name": "Test1_Arabic",
            "description": ""
          },
          {
            "languageCode": "en",
            "name": "Test Item",
            "description": "This is a test item"
          }
        ],
        "selectedTranslation": {
          "languageCode": "ar",
          "name": "Test1_Arabic",
          "description": ""
        },
        "categories": [],
        "ingredientGroups": [
          {
            "translations": [
              {
                "languageCode": "ar",
                "name": "Test1_Arabic"
              },
              {
                "languageCode": "en",
                "name": "Test1"
              }
            ],
            "selectedTranslation": {
              "languageCode": "ar",
              "name": "Test1_Arabic"
            },
            "ingredients": [
              {
                "translations": [
                  {
                    "languageCode": "ar",
                    "name": "Test1_Arabic"
                  },
                  {
                    "languageCode": "en",
                    "name": "Test1"
                  }
                ],
                "selectedTranslation": {
                  "languageCode": "ar",
                  "name": "Test1_Arabic"
                },
                "addByDefault": false,
                "price": 0,
                "allowQuantity": 1
              }
            ],
            "maxNumberOfIngredients": 1,
            "minNumberOfIngredients": 1,
            "orderPriority": 1,
            "newIngredient": {
              "translations": [
                {
                  "languageCode": "ar",
                  "name": ""
                },
                {
                  "languageCode": "en",
                  "name": ""
                }
              ],
              "selectedTranslation": {
                "languageCode": "ar",
                "name": ""
              },
              "addByDefault": false,
              "price": 0,
              "allowQuantity": 1
            }
          },
          {
            "translations": [
              {
                "languageCode": "ar",
                "name": "Test2_Arabic"
              },
              {
                "languageCode": "en",
                "name": "Test2_EN"
              }
            ],
            "selectedTranslation": {
              "languageCode": "ar",
              "name": "Test2_Arabic"
            },
            "ingredients": [
              {
                "translations": [
                  {
                    "languageCode": "ar",
                    "name": "Test2_Arabic"
                  },
                  {
                    "languageCode": "en",
                    "name": "Test2_EN"
                  }
                ],
                "selectedTranslation": {
                  "languageCode": "ar",
                  "name": "Test2_Arabic"
                },
                "addByDefault": false,
                "price": 5,
                "allowQuantity": 1
              }
            ],
            "maxNumberOfIngredients": 1,
            "minNumberOfIngredients": 1,
            "orderPriority": 2,
            "newIngredient": {
              "translations": [
                {
                  "languageCode": "ar",
                  "name": ""
                },
                {
                  "languageCode": "en",
                  "name": ""
                }
              ],
              "selectedTranslation": {
                "languageCode": "ar",
                "name": ""
              },
              "addByDefault": false,
              "price": 0,
              "allowQuantity": 1
            }
          }
        ],
        "imageUrl": "",
        "sizes": [
          {
            "translations": [
              {
                "languageCode": "ar",
                "name": "Regular_AR"
              },
              {
                "languageCode": "en",
                "name": "Regular"
              }
            ],
            "selectedTranslation": {
              "languageCode": "ar",
              "name": "Regular_AR"
            },
            "price": 2
          },
          {
            "translations": [
              {
                "languageCode": "ar",
                "name": "Large_AR"
              },
              {
                "languageCode": "en",
                "name": "Large"
              }
            ],
            "selectedTranslation": {
              "languageCode": "ar",
              "name": "Large_AR"
            },
            "price": 3
          }
        ],
        "newSize": {
          "translations": [
            {
              "languageCode": "ar",
              "name": ""
            },
            {
              "languageCode": "en",
              "name": ""
            }
          ],
          "selectedTranslation": {
            "languageCode": "ar",
            "name": ""
          },
          "price": 0
        },
        "userId": 1
      }
    }

    item.addItem(req, res).then(function (result) {
      expect(res.obj.success).toBe(1);
      expect(res.obj.description).toBe("Item Added");
      done();
    })
  })


  it("should not create a invalid item because it has no sizes", function (done) {
    var req = {
      body: {
        "translations": [
          {
            "languageCode": "ar",
            "name": "Test1_Arabic",
            "description": ""
          },
          {
            "languageCode": "en",
            "name": "Test Item",
            "description": "This is a test item"
          }
        ],
        "selectedTranslation": {
          "languageCode": "ar",
          "name": "Test1_Arabic",
          "description": ""
        },
        "categories": [],
        "ingredientGroups": [
          {
            "translations": [
              {
                "languageCode": "ar",
                "name": "Test1_Arabic"
              },
              {
                "languageCode": "en",
                "name": "Test1"
              }
            ],
            "selectedTranslation": {
              "languageCode": "ar",
              "name": "Test1_Arabic"
            },
            "ingredients": [
              {
                "translations": [
                  {
                    "languageCode": "ar",
                    "name": "Test1_Arabic"
                  },
                  {
                    "languageCode": "en",
                    "name": "Test1"
                  }
                ],
                "selectedTranslation": {
                  "languageCode": "ar",
                  "name": "Test1_Arabic"
                },
                "addByDefault": false,
                "price": 0,
                "allowQuantity": 1
              }
            ],
            "maxNumberOfIngredients": 1,
            "minNumberOfIngredients": 1,
            "orderPriority": 1,
            "newIngredient": {
              "translations": [
                {
                  "languageCode": "ar",
                  "name": ""
                },
                {
                  "languageCode": "en",
                  "name": ""
                }
              ],
              "selectedTranslation": {
                "languageCode": "ar",
                "name": ""
              },
              "addByDefault": false,
              "price": 0,
              "allowQuantity": 1
            }
          },
          {
            "translations": [
              {
                "languageCode": "ar",
                "name": "Test2_Arabic"
              },
              {
                "languageCode": "en",
                "name": "Test2_EN"
              }
            ],
            "selectedTranslation": {
              "languageCode": "ar",
              "name": "Test2_Arabic"
            },
            "ingredients": [
              {
                "translations": [
                  {
                    "languageCode": "ar",
                    "name": "Test2_Arabic"
                  },
                  {
                    "languageCode": "en",
                    "name": "Test2_EN"
                  }
                ],
                "selectedTranslation": {
                  "languageCode": "ar",
                  "name": "Test2_Arabic"
                },
                "addByDefault": false,
                "price": 5,
                "allowQuantity": 1
              }
            ],
            "maxNumberOfIngredients": 1,
            "minNumberOfIngredients": 1,
            "orderPriority": 2,
            "newIngredient": {
              "translations": [
                {
                  "languageCode": "ar",
                  "name": ""
                },
                {
                  "languageCode": "en",
                  "name": ""
                }
              ],
              "selectedTranslation": {
                "languageCode": "ar",
                "name": ""
              },
              "addByDefault": false,
              "price": 0,
              "allowQuantity": 1
            }
          }
        ],
        "imageUrl": "",
        "sizes": [
        ],
        "newSize": {
          "translations": [
            {
              "languageCode": "ar",
              "name": ""
            },
            {
              "languageCode": "en",
              "name": ""
            }
          ],
          "selectedTranslation": {
            "languageCode": "ar",
            "name": ""
          },
          "price": 0
        },
        "userId": 1
      }
    }

    item.addItem(req, res);
    expect(res.statusCode).toBe(400);
    expect(res.obj.message).toBe("At least one size is required");
    done();
  })


});
