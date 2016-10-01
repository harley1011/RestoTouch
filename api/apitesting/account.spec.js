assert = require('assert');
var request = require("request");



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






console.log("test assert!")
assert.strictEqual(1,1);
