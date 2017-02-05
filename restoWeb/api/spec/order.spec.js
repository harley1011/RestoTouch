var order = require('../controllers/order');
// var mocks = require('./mocks/mocks');
var promise = require('promise');
var _ = require('lodash');

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
        order.removeAllRestaurantsOrders(req, res).then(function (result) {
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

  it("should store seven orders then remove the fifth order and try to remove it again to make it fail", function (done) {
    var promises = [];
    var numberOfOrders = 7;
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
        expect(JSON.stringify(res.obj.orders)).toBe(JSON.stringify(expectedArray));
        req.orderId = 5;
        order.removeRestaurantsOrder(req, res).then(function () {
          expect(res.obj.success).toBe(true);
          expect(res.obj.message).toBe("Order removed from restaurants order");

          _.remove(expectedArray, function (n) {
            return n.orderId == req.orderId;
          });

          order.retrieveOrders(req, res).then(function (result) {
            expect(JSON.stringify(res.obj.orders)).toBe(JSON.stringify(expectedArray));

            order.removeRestaurantsOrder(req, res).then(function () {
              expect(res.obj.success).toBe(false);
              expect(res.obj.message).toBe("Order not removed because it doesn't exist in the restaurants orders");
              done();
            });
          });
        });

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
    order.removeAllRestaurantsOrders(req, res);
  });

  afterAll(function () {

    order.closeRedis();
  });
});
