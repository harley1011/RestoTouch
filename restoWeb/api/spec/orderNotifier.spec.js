var configAuth = require('../../config/auth');
var jwt = require('jwt-simple');
var promise = require('promise');
describe("The Order API", function () {
  var express = require('express');
  var app = express();
  var orderNotifier = require('../controllers/orderNotifier.js')(app.listen(1017));
  var io = require('socket.io-client');
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

  var tokenContainer = genToken({email: "test@restotouch.com", id: "10100"});

  it("should subscribe to the socket and recieve an order", function (done) {

    var restaurantId = 100100;
    var socket = io('http://localhost:1017/');
    socket.on('newOrder', function (data) {
      expect(data).toBe(JSON.stringify(testOrder));

      socket.emit('orderUnsubscribe', {restaurantId: restaurantId, token: tokenContainer.token});
      setTimeout(function () {
        done();
      }, 1000)
    });
    socket.emit('orderSubscribe', {restaurantId: restaurantId, token: tokenContainer.token});

    setTimeout(function () {
      client.publish('restaurantNewOrder' + restaurantId, JSON.stringify(testOrder));
    }, 1000)
  });

  it("should subscribe to the socket multiple times and recieve an order on all of them", function (done) {
    var restaurantId = 100100;
    var numberOfConnections = 5;
    var messagesReceivedOnConnectionCount = [];
    var promises = [];

    for (var i = 0; i < numberOfConnections; i++) {
      var socket = io('http://localhost:1017/');

      promises.push(new Promise(function (fulfill) {

        socket.on('newOrder', function (data) {
          messagesReceivedOnConnectionCount.push(data);
          fulfill();
        });
        socket.emit('orderSubscribe', {restaurantId: restaurantId, token: tokenContainer.token});
      }));

    }
    setTimeout(function () {
      client.publish('restaurantNewOrder' + restaurantId, JSON.stringify(testOrder));
      promise.all(promises).then(function () {
        expect(messagesReceivedOnConnectionCount.length).toBe(numberOfConnections);
        for (var i = 0; i < messagesReceivedOnConnectionCount.length; i++) {
          expect(messagesReceivedOnConnectionCount[i]).toBe(JSON.stringify(testOrder));
        }
        done();
      });

    }, 1000);
  });

  it("should subscribe to the socket multiple times on different restaurants and recieve an order on all of them from the correct restaurant", function (done) {
    var restaurantId = 100100;
    var restaurantId2 = 210100;
    var numberOfConnections = 10;
    var messagesReceivedOnConnectionCount1 = [];
    var messagesReceivedOnConnectionCount2 = [];
    var promises1 = [];
    var promises2 = [];
    var testOrder2 = JSON.parse(JSON.stringify(testOrder));
    testOrder2.order.restaurantId = restaurantId2;
    testOrder2.order.total = 100;

    for (var i = 0; i < numberOfConnections; i++) {
      var socket = io('http://localhost:1017/');


      var promiseStore = new Promise(function (fulfill) {

        if ( i % 2 == 1) {
          socket.on('newOrder', function (data) {
              messagesReceivedOnConnectionCount1.push(data);
            fulfill();
          });
        } else {
          socket.on('newOrder', function (data) {
            messagesReceivedOnConnectionCount2.push(data);
            fulfill();
          });
        }


        socket.emit('orderSubscribe', {
          restaurantId: i % 2 == 1 ? restaurantId : restaurantId2,
          token: tokenContainer.token
        });
      });
      if (i % 2 == 1) {
        promises1.push(promiseStore);
      } else {
        promises2.push(promiseStore);
      }

    }

    setTimeout(function () {
      client.publish('restaurantNewOrder' + restaurantId, JSON.stringify(testOrder));
      client.publish('restaurantNewOrder' + restaurantId2, JSON.stringify(testOrder2));
      promise.all(promises1).then(function () {
        expect(messagesReceivedOnConnectionCount1.length).toBe(numberOfConnections / 2);
        for (var i = 0; i < messagesReceivedOnConnectionCount1.length; i++) {
          expect(messagesReceivedOnConnectionCount1[i]).toBe(JSON.stringify(testOrder));
        }

        promise.all(promises2).then(function () {
          expect(messagesReceivedOnConnectionCount2.length).toBe(numberOfConnections / 2);
          for (var i = 0; i < messagesReceivedOnConnectionCount2.length; i++) {
            expect(messagesReceivedOnConnectionCount2[i]).toBe(JSON.stringify(testOrder2));
          }
          done();
        });

      });

    }, 2000);


  })


});

function genToken(user) {
  var expires = expiresIn(10000);
  var token = jwt.encode({
    exp: expires,
    email: user.email,
    id: user.id
  }, configAuth.secret);

  return {
    token: token,
    expires: expires,
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

