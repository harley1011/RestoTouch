describe("The Order API", function () {
  var express = require('express');
  var app = express();
  var orderNotifier = require('../controllers/orderNotifier.js')(app.listen(1017));
  var socket = require('socket.io-client')('http://localhost:1017/');
  var redis = require('redis');
  var client = redis.createClient("redis://rediscloud:6wPtT2Oi8rVx458z@redis-19567.c8.us-east-1-3.ec2.cloud.redislabs.com:19567", {no_ready_check: false});

  var testOrder = {
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
  };

  it("should subscribe to the socket and recieve an order", function (done) {

    var restaurantId = 100100;
    socket.on('newOrder', function (data) {
      expect(data).toBe(JSON.stringify(testOrder));

      socket.emit('orderUnsubscribe', {restaurantId: restaurantId});
      setTimeout(function () {
        done();
      }, 1000)
    });
    socket.emit('orderSubscribe', {restaurantId: restaurantId});

    setTimeout(function () {

      client.publish('restaurantNewOrder' + restaurantId, JSON.stringify(testOrder));
    }, 1000)


  })
});
