var restaurantMenu = require('../controllers/restaurantMenu');
var mocks = require('./mocks/mocks');

describe("The Restaurant Menu API", function() {

  var res = {
    json: function (obj) {
      res.obj = obj;
    }
  };

  //Override models in restaurant so that we don't actually insert into the DB and we mock the database operations
  restaurantMenu.setDatabase(mocks);

  it("should create a valid restaurant menu relation", function (done) {
    var req = {
      body: {
        "RestaurantId": 2,
        "MenuId": 3
      }
    }

    restaurantMenu.saveRestaurantMenu(req, res).then(function (result) {
      expect(res.obj.success).toBe(1);
      expect(res.obj.description).toBe("Restaurant Menu Relation Added");
      done();
    })
  })

  it("should delete a restaurant", function (done) {
    var req = {
      swagger: {
        params: {
          restaurantId: {
            value: 2
          },
          menuId: {
            value: 3
          }
        }
      }
    }

    restaurantMenu.delRestaurantMenu(req, res).then(function (result) {
      expect(res.obj.success).toBe(1);
      expect(res.obj.description).toBe("Restaurant Menu Relation Deleted");
      done();
    })
  })
});
