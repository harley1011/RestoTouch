assert = require('assert');
var request = require("request");
account = require("/account.specs");  

//PSEUDO CODE 
// if it creates an entry in the model. -> Need to check if the status is 200.
//  if it sends the right message for correct input.
//  if it sends the right message for the incorrect input.  

var base_url = "'http://localhost:10010'";


// using jasmine
describe("Register an owner to the Server", function() {
  describe(" Sending a POST request", function() {
    it("should return status code 200", function() {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});


