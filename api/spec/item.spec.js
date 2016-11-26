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
        "name": "Item 1",
        sizes: [{"name": "regular", "price": 1}]
      }
    }

    // item.addItem(req, res).then(function (result) {
    //   expect(res.obj.success).toBe(1);
    //   expect(res.obj.description).toBe("Item Added");
    //   done();
    // })
    done();
  })


  it("should not create a invalid item because it has no sizes", function (done) {
    var req = {
      body: {
        "name": "Item 1"
      }
    }

    // item.addItem(req, res)
    // expect(res.statusCode).toBe(400);
    // expect(res.obj.message).toBe("At least one size is required");
    done();
  })
});
