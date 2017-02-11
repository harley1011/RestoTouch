var order = require('../controllers/order');
// var mocks = require('./mocks/mocks');
var promise = require('promise');
var _ = require('lodash');

describe("The Order API", function () {

  var req = {};

  var restaurantReq = {
    body: {
      restaurantId: 100100
    }
  };
  var res = {
    json: function (obj) {
      res.obj = obj;
    }
  };

  it("should place, retrieve an order and then delete it", function (done) {
    order.placeOrder(req, res).then(function () {
      expect(res.obj.success).toBe(1);
      expect(res.obj.description).toBe("Order stored");
      expect(res.obj.orderId).toBeDefined();
      var generatedId = res.obj.orderId;
      var retReq = {body: {
        restaurantId: req.body.order.restaurantId
      }}
      order.retrieveOrders(retReq, res).then(function (result) {
        var orders = res.obj.orders;
        expect(generatedId).toBe(orders[0].id);
        order.removeAllRestaurantsOrders(retReq, res).then(function (result) {
          expect(res.obj.success).toBe(1);
          expect(res.obj.description).toBe("Orders removed");
          done();
        });
      });
    });
  });

  it("should retrieve a empty array with no orders", function (done) {
    order.retrieveOrders({body: {
      "restaurantId": 100100
    }}, res).then(function (result) {
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
      var creq = JSON.parse(JSON.stringify(req));
      creq.body.order.total += i * 5;
      expectedArray.push(creq.body.order);
      promises.push(order.placeOrder(creq, res));
    }

    promise.all(promises).then(function (values) {
      order.retrieveOrders(restaurantReq, res).then(function (result) {
        for(var i = 0; i  < res.obj.orders.length; i++) {
          expect(res.obj.orders[i].total).toBe(expectedArray[i].total);
        }
        restaurantReq.body.orderId = values[5];
        order.removeRestaurantsOrder(restaurantReq, res).then(function () {
         expect(res.obj.success).toBe(1);
         expect(res.obj.description).toBe("Order removed from restaurants order");

          order.retrieveOrders(restaurantReq, res).then(function (result) {
            expect(res.obj.orders.length).toBe(numberOfOrders - 1);
            res.obj.orders.forEach(function (order) {
              expect(order.id != restaurantReq.body.orderId).toBe(true);
            });

            order.removeRestaurantsOrder(restaurantReq, res).then(function () {
              expect(res.obj.success).toBe(0);
              expect(res.obj.description).toBe("Order not removed because it doesn't exist in the restaurants orders");
              done();
            });
          });
        });

      });
    });
  });


  beforeEach(function () {
    req = {
      body: {
        order: {
          "orderedItems": [
            {
              "item": {
                "id": 1,
                "imageUrl": "",
                "createdAt": "2017-02-01T18:38:45.759Z",
                "updatedAt": "2017-02-01T18:38:45.759Z",
                "userId": 1,
                "ItemCategory": {
                  "id": 1,
                  "createdAt": "2017-02-01T18:53:04.323Z",
                  "updatedAt": "2017-02-01T18:53:04.323Z",
                  "itemId": 1,
                  "categoryId": 1
                },
                "translations": [
                  {
                    "languageCode": "en",
                    "language": null,
                    "name": "Burger",
                    "description": "Yummy burger",
                    "itemId": 1,
                    "createdAt": "2017-02-01T18:38:45.872Z",
                    "updatedAt": "2017-02-01T18:38:45.872Z"
                  }
                ],
                "sizes": [
                  {
                    "id": 1,
                    "price": 2,
                    "createdAt": "2017-02-01T18:38:45.865Z",
                    "updatedAt": "2017-02-01T18:38:45.865Z",
                    "itemId": 1
                  }
                ]
              },
              "sizes": [
                {
                  "size": {
                    "id": 1,
                    "price": 2,
                    "createdAt": "2017-02-01T18:38:45.865Z",
                    "updatedAt": "2017-02-01T18:38:45.865Z",
                    "itemId": 1
                  },
                  "quantity": 3
                }
              ],
              "ingredients": []
            }
          ],
          "total": 6,
          "restaurantId": 100100
        }
      }
    };


    res = {
      json: function (obj) {
        res.obj = obj;
      }
    };
  });


  beforeEach(function () {
    order.removeAllRestaurantsOrders({
      body: {
        restaurantId: 100100
      }
    }, res);
  });

  afterAll(function () {

    order.closeRedis();
  });
})
;
