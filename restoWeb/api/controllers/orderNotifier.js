var io;
module.exports = function (app) {
  var io = require('socket.io')(app);

  var redis = require('redis');
  var client = redis.createClient("redis://rediscloud:6wPtT2Oi8rVx458z@redis-19567.c8.us-east-1-3.ec2.cloud.redislabs.com:19567", {no_ready_check: false});

  client.on("subscribe", function (channel, count) {
    console.log("subscribe" + channel + ": " + count);

  });

  client.on("message", function (channel, message) {
    console.log("sub channel " + channel + ": " + message);

    // Send to all clients connected over the socket
    io.sockets.in(channel).emit('newOrder', message);

  });

  io.on('connection', function (socket) {

    socket.on('orderSubscribe', function (data) {
      var restaurantId = data.restaurantId;

      // Client joins socket group for this id
      socket.join('restaurantNewOrder' + restaurantId);

      // Subscribe this notifier to recieve and publishes from the channel
      client.subscribe('restaurantNewOrder' + restaurantId);

    });


  });

}


function setup() {

}
