var order = require('../controllers/order');
// var mocks = require('./mocks/mocks');
var promise = require('promise');
describe("The Order API", function () {

  var req = {
    restaurantId: 1010100,
    placedOrder: {
      orderId: 1
    }
  };

  var res = {
    json: function (obj) {
      res.obj = obj;
    }
  };

  it("should place, retrieve an order and then delete it", function (done) {
    order.placeOrder(req, res).then(function () {
      expect(res.obj.success).toBe(true);
      expect(res.obj.message).toBe("Order stored");
      order.retrieveOrders(req, res).then(function (result) {
        var orders = res.obj.orders;
        expect({orderId: 1}.orderId).toBe(orders[0].orderId);
        order.removeAllOrders(req, res).then(function (result) {
          expect(res.obj.success).toBe(true);
          expect(res.obj.message).toBe("Orders removed");
          done();
        });

      });
    });


  });

  it("should retrieve a empty array with no orders", function (done) {
    order.retrieveOrders(req, res).then(function (result) {
      var orders = res.obj.orders;
      expect(orders.length).toBe(0);
      done();
    });

  });



  it("should store ten orders then ask for the fifth order by id", function (done) {
    var promises = [];
    var numberOfOrders = 4;
    var expectedArray = [];
    for (var i = 0; i < numberOfOrders; i++) {
      var res = {
        json: function (obj) {
          res.obj = obj;
        }
      };
      var req = {
        restaurantId: 1010100,
        placedOrder: {
          orderId: i + 1
        }
      };
      expectedArray.push(req.placedOrder);
      promises.push(order.placeOrder(req, res));
    }

    promise.all(promises).then(function (values) {

      order.retrieveOrders(req, res).then(function (result) {
        console.log(res.obj);
        expect(JSON.stringify(res.obj.orders)).toBe(JSON.stringify(expectedArray));
        done();
      });
    });

  });

  beforeEach(function () {
    req = {
      restaurantId: 1010100,
      placedOrder: {
        orderId: 1
      }
    };

    res = {
      json: function (obj) {
        res.obj = obj;
      }
    };
  });

  beforeAll(function () {
    order.removeAllOrders(req, res);
  });

  afterAll(function () {

    order.closeRedis();
  });
});
