describe("The Order API", function () {
  var socket = require('socket.io-client')('http://localhost:10010/')
  it("should subscribe to the socket", function (done) {
    socket.on('connect', function(){
      console.log("hello");
    });
    socket.on('event', function(data){

    });
    socket.on('disconnect', function(){

    });

  })
});
