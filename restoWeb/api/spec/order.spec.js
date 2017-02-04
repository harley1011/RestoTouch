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

  it("should place and retrieve an order", function (done) {
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

  // it("should retrieve a non existing order", function (done) {
  //   var res = {};
  //   order.placeOrder(req, res);
  //
  //   order.retrieveOrders(req, res).then(function (result) {
  //     var orders = JSON.parse(result.orders);
  //     console.log(orders[0]);
  //     expect({orderId: 1}.orderId).toBe(orders[0].orderId);
  //
  //     done();
  //   });
  //
  // });

  afterAll(function () {
    order.closeRedis();
  });

  afterEach(function (done) {
    order.removeAllOrders(req, res).then(function () {
      done();
    });
  })


});
