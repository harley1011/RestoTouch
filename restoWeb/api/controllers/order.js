//var models = require("../../database/models");
var redis = require('redis');
var client = redis.createClient("redis://rediscloud:6wPtT2Oi8rVx458z@redis-19567.c8.us-east-1-3.ec2.cloud.redislabs.com:19567", {no_ready_check: false});
var promise = require('promise');
setDatabase();

module.exports = {
  placeOrder: placeOrder,
  retrieveOrders: retrieveOrders,
  removeAllOrders: removeAllOrders,
  closeRedis: closeRedis
};

function setDatabase() {

  //models = m;
}

function placeOrder(req, res) {
  var restaurantId = req.restaurantId;
  var order = req.placedOrder;
  var restaurantOrders = [];

  //todo add redis lock
  if (client.exists('restaurantOrders:' + restaurantId)) {
    restaurantOrders = JSON.parse(client.get('restaurantId'));
  }

  restaurantOrders.push(order);
  client.set('restaurantOrders:' + restaurantId, JSON.stringify(restaurantOrders));
  //todo notify listeners
}

function retrieveOrders(req, res) {
  var restaurantId = req.restaurantId;

  return new promise(function (fulfill, reject){
    client.get('restaurantOrders:' + restaurantId, function (err, reply) {
      fulfill({success: true, orders: reply});
    });
  });
}


function removeAllOrders(req, res) {
  var restaurantId = req.restaurantId;
  return client.del('restaurantOrders:' + restaurantId).then(function () {
    return res.json({success: true});
  });

}

function closeRedis() {
  client.quit();
}
