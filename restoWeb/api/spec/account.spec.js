var account = require('../controllers/account');
var mocks = require('./mocks/index');



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

describe("Login Tests", function() {

  var req = {
    body: {
      "email": "test123@sample.com",
      "password": "password"
    }
  }

  var invalid_req = {
    body: {
      "email": "test123@sample.com",
      "password": "Password"
    }
  };

  var res = {
      json: function (obj) {
        res.obj = obj;
      },
      status: function (code) {
        res.status = code;
      }
  };

  //Override models in account so that we don't actually insert into the DB and we mock the database operations
  account.setDatabase(mocks);

  it("should login a user with valid email and valid password", function (done) {
    account.login(req, res).then(function (result) {
      expect(res.obj.user.id).toBe(100);
      expect(res.obj.user.email).toBe(req.body.email);
      expect(res.obj.success).toBe(1);
      expect(res.obj.description).toBe("User logged in");
      done();
    })
  })

   it("should login a user with valid email and invalid password", function (done) {
    account.login(invalid_req, res).then(function (result) {
      expect(res.status).toBe(401);
      expect(res.obj.message).toBe("User access denied");
      done();
    })
  })

});

describe("Profile Tests", function() {

  var req = {}

  var res = {json: function (obj) {
    res.obj = obj;
  }};

  //Override models in account so that we don't actually insert into the DB and we mock the database operations
  account.setDatabase(mocks);

  it("Get a valid user", function (done) {
    account.getProfile(req, res).then(function (result) {
      expect(res.obj.id).toBe(100);
      expect(typeof res.obj).toBe('object');
      expect(res.obj.email).toBe('test123@sample.com');
      done();
    })
  })

});
