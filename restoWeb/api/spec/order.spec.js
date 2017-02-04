var order = require('../controllers/order');
// var mocks = require('./mocks/mocks');

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

  afterAll(function () {
    order.closeRedis();
  });
});
