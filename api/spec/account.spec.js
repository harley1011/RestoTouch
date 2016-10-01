var account = require('../controllers/account');
var mocks = require('./mocks');



describe("Register Tests", function() {

  var req = {
    body: {
      "firstName": "Harley",
      "lastName": "McPhee",
      "email": "test@gmail.com",
      "password": "Password"
    }
  }

  var res = {json: function (obj) {
    res.obj = obj;
  }};

  //Override models in account so that we don't actually insert into the DB and we mock the database operations
  account.setDatabase(mocks);

  it("Register a valid user", function (done) {
    account.register(req, res).then(function (result) {
      expect(res.obj.user.id).toBe(100);
      expect(res.obj.user.email).toBe(req.body.email);
      done();
    })
  })

});
