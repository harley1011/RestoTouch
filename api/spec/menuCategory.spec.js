var menuCategory = require('../controllers/menuCategory');
var mocks = require('./mocks/mocks');

describe("The MenuCategory API", function() {

  var res = {
    json: function (obj) {
      res.obj = obj;
    }
  };

  //Override models in menu so that we don't actually insert into the DB and we mock the database operations
  menuCategory.setDatabase(mocks);

  it("should create a valid menu-category relation", function (done) {
    var req = {
      body: {
        "menuId": 3,
        "categoryId": 1,
        "order": 2,
      }
    }

    menuCategory.saveMenuCategory(req, res).then(function (result) {
      expect(res.obj.success).toBe(1);
      expect(res.obj.description).toBe("Added Category to Menu");
      done();
    })
  })

  it("should delete a category from a menu", function (done) {
    var req = {
      swagger: {
        params: {
          menuId: {
            value: 3
          },
          categoryId: {
            value: 1
          },
          order: {
            value: 2
          }
        }
      }
    }

    menuCategory.delMenuCategory(req, res).then(function (result) {
      expect(res.obj.success).toBe(1);
      expect(res.obj.description).toBe("Deleted Category from Menu");
      done();
    })
  })
});
