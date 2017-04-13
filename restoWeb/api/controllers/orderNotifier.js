var io;
var configAuth = require('../../config/auth');
var jwt = require('jwt-simple');
var redisConfig = require("../../config/redis");
module.exports = function (app) {
  var io = require('socket.io')(app);

  var redis = require('redis');
  var client = redis.createClient(redisConfig.url, {no_ready_check: false});

  client.on("subscribe", function (channel, count) {

  });

  client.on("message", function (channel, message) {
    // Send to all clients connected over the socket
    io.to(channel).emit('newOrder', message);

  });

  io.on('connection', function (socket) {

    socket.on('orderSubscribe', function (data) {
      var restaurantId = data.restaurantId;

      if (!data.token || !validateUser(data.token))
        return;

      // Client joins socket group for this id
      socket.join('restaurantNewOrder' + restaurantId);
      // Subscribe to recieve new orders from when the api stores messages in the redis cache
      client.subscribe('restaurantNewOrder' + restaurantId);
    });

    socket.on('orderUnsubscribe', function (data) {
      var restaurantId = data.restaurantId;
      socket.leave('restaurantNewOrder' + restaurantId);

      var numberOfListeners = io.sockets.adapter.rooms['restaurantNewOrder' + restaurantId];
      if (!numberOfListeners) {
        client.unsubscribe('restaurantNewOrder' + restaurantId);
      }
    })


  });

}


function validateUser(token) {
  try {
    var decoded = jwt.decode(token, configAuth.secret);
  }
  catch (e) {
    return null;
  }
  return decoded;

}
