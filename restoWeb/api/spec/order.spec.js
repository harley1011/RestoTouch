var order = require('../controllers/order');
// var mocks = require('./mocks/mocks');

describe("The Order API", function() {

  var req = {
      restaurantId: 1010100,
      placedOrder: {
        orderId: 1
      }
  };

  var res = {json: function (obj) {
    res.obj = obj;
  }};

  it("should place and order", function (done) {
    var res = {};
    order.placeOrder(req, res);

    order.retrieveOrders(req, res).then(function (result) {
      var orders = JSON.parse(result.orders);
      console.log(orders[0]);
      expect({orderId: 1}.orderId).toBe(orders[0].orderId);
      order.closeRedis();
      done();
    });


  })


});
