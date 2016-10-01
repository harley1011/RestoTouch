var restaurant = require('../controllers/restaurant');
var mocks = require('./mocks/mocks');

describe("Restaurant Tests", function() {

  var res = {
    json: function (obj) {
      res.obj = obj;
    }
  };

  //Override models in restaurant so that we don't actually insert into the DB and we mock the database operations
  restaurant.setDatabase(mocks);

  it("Create a valid restaurant", function (done) {
    var req = {
      body: {
        "name": "Restaurant 1",
        "description": "Description",
        "address": "Address",
        "m_open": "9:00",
        "m_close": "9:00",
        "tu_open": "9:00",
        "tu_close": "9:00",
        "w_open": "9:00",
        "w_close": "9:00",
        "th_open": "9:00",
        "th_close": "9:00",
        "f_open": "9:00",
        "f_close": "9:00",
        "sa_open": "9:00",
        "sa_close": "9:00",
        "su_open": "9:00",
        "su_close": "9:00"
      }
    }

    restaurant.save(req, res).then(function (result) {
      expect(res.obj.success).toBe(1);
      expect(res.obj.description).toBe("Restaurant Added");
      done();
    })
  })

  it("Update a restaurant", function (done) {
    var req = {
      body: {
        "name": "Restaurant 2",
        "description": "Description",
        "address": "Address",
        "m_open": "9:00",
        "m_close": "9:00",
        "tu_open": "9:00",
        "tu_close": "9:00",
        "w_open": "9:00",
        "w_close": "9:00",
        "th_open": "9:00",
        "th_close": "9:00",
        "f_open": "9:00",
        "f_close": "9:00",
        "sa_open": "9:00",
        "sa_close": "9:00",
        "su_open": "9:00",
        "su_close": "9:00"
      },
      swagger: {
        params: {
          name: {
            value: "Restaurant 1"
          }
        }
      }
    }

    restaurant.update(req, res).then(function (result) {
      expect(res.obj.success).toBe(1);
      expect(res.obj.description).toBe("Restaurant Updated");
      done();
    })
  })

  it("Get all restaurants", function (done) {
    var req = {};

    restaurant.getAll(req, res).then(function (result) {
      expect(Array.isArray(res.obj.restaurants)).toBe(true);
      expect(typeof res.obj.restaurants[0]).toBe('object');
      done();
    })
  })

  it("Get a restaurant", function (done) {
    var req = {
      swagger: {
        params: {
          name: {
            value: "Restaurant 1"
          }
        }
      }
    }

    restaurant.get(req, res).then(function (result) {
      expect(typeof res.obj).toBe('object');
      expect(res.obj.name).toBe(req.swagger.params.name.value);
      done();
    })
  })

  it("Delete a restaurant", function (done) {
    var req = {
      swagger: {
        params: {
          name: {
            value: "Restaurant 1"
          }
        }
      }
    }

    restaurant.del(req, res).then(function (result) {
      expect(res.obj.success).toBe(1);
      expect(res.obj.description).toBe("Restaurant Deleted");
      done();
    })
  })

});
