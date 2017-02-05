//var models = require("../../database/models");
var redis = require('redis');
var client = redis.createClient("redis://rediscloud:6wPtT2Oi8rVx458z@redis-19567.c8.us-east-1-3.ec2.cloud.redislabs.com:19567", {no_ready_check: false});
var promise = require('promise');
var Redlock = require('redlock');
var uuid = require('node-uuid');
var ttl = 1000;
var _ = require('lodash');

var redlock = new Redlock(
  // you should have one client for each redis node
  // in your cluster
  [client],
  {
    // the expected clock drift; for more details
    // see http://redis.io/topics/distlock
    driftFactor: 0.01, // time in ms

    // the max number of times Redlock will attempt
    // to lock a resource before erroring
    retryCount: 30,

    // the time in ms between attempts
    retryDelay: 100 // time in ms
  }
);

setDatabase();

module.exports = {
  placeOrder: placeOrder,
  retrieveOrders: retrieveRestaurantOrders,
  removeAllRestaurantsOrders: removeAllOrders,
  closeRedis: closeRedis,
  removeRestaurantsOrder: removeRestaurantsOrder
};

function setDatabase() {

  //models = m;
}

function placeOrder(req, res) {
  return new promise(function (fulfill, reject) {
      var restaurantId = req.restaurantId;
      var order = req.placedOrder;
      var restaurantOrders = [];
      var restaurantKey = 'restaurantOrders:' + restaurantId;
      var uuidGen = uuid.v4();
      redlock.lock(restaurantKey + 'lock', ttl).then(function (lock) {
        var internalPromise = new promise(function (internalFulfill, reject) {
          client.get(restaurantKey, function (err, reply) {
            if (reply) {
              restaurantOrders = JSON.parse(reply);
              unlock(lock);
              internalFulfill(restaurantOrders);
            }
            else {
              unlock(lock);
              internalFulfill([]);
            }
          });
        });

        internalPromise.then(function (restaurantOrders) {
          restaurantOrders.push(order);
          client.setex(restaurantKey, 24*60*60, JSON.stringify(restaurantOrders), function (err, reply) {
            if (reply == "OK") {
              res.json({success: true, message: "Order stored"});
              unlock(lock);
              fulfill();
            }
            else {
              res.json({success: false, message: "Order failed to store"});
              unlock(lock);
              reject();
            }
          });
        });
      });
      //todo add redis lock

    }
  );


//todo notify listeners
}

function unlock(lock) {
  return lock.unlock()
    .catch(function (err) {
      console.error(err);
    });
}

function retrieveRestaurantOrders(req, res) {
  var restaurantId = req.restaurantId;
  var restaurantKey = 'restaurantOrders:' + restaurantId;
  return new promise(function (fulfill, reject) {
    redlock.lock(restaurantKey + 'lock', ttl).then(function (lock) {
      client.get(restaurantKey, function (err, reply) {
        if (reply == null) {
          res.json({success: true, orders: []});
        }
        else {
          res.json({success: true, orders: JSON.parse(reply)});
        }
        unlock(lock);
        fulfill();
      });
    });
  });
}

function removeRestaurantsOrder(req, res) {
  var restaurantKey = 'restaurantOrders:' + req.restaurantId;
  return new promise(function (fulfill, reject) {
    redlock.lock(restaurantKey + 'lock', ttl).then(function (lock) {
      client.get(restaurantKey, function (err, reply) {
        if (reply) {
          var restaurantOrders = JSON.parse(reply);
          var removed = _.remove(restaurantOrders, function (n) {
            return n.orderId == req.orderId;
          });

          if (removed.length == 0) {
            res.json({success: false, message: "Order not removed because it doesn't exist in the restaurants orders"});
            unlock(lock);
            fulfill();
          }

          client.setex(restaurantKey, 24*60*60, JSON.stringify(restaurantOrders), function (err, reply) {
            if (reply == "OK") {
              res.json({success: true, message: "Order removed from restaurants order"});
              unlock(lock);
              fulfill();
            }
            else {
              res.json({success: false, message: "Order failed to store, removed would be persisted"});
              unlock(lock);
              reject();
            }
          });
        }
        else {
          res.json({success: false, message: "Order not removed because it doesn't exist in the restaurants orders"})
          unlock(lock);
          fulfill();
        }
      });
    });
  });
}


function removeAllOrders(req, res) {
  var restaurantId = req.restaurantId;

  return new promise(function (fulfill, reject) {
    client.del('restaurantOrders:' + restaurantId, function (err, reply) {
      if (reply == 1) {
        res.json({success: true, message: "Orders removed"});
        fulfill();
      }
      else {
        res.json({success: false, message: "No orders for restaurant exists"});
        fulfill();
      }
    });
  });
}

function closeRedis() {
  client.quit();
}
