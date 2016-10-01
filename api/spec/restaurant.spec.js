var restaurant = require('../controllers/restaurant');
var mocks = require('./mocks/mocks');

describe("Restaurant Tests", function() {

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

  var res = {json: function (obj) {
    res.obj = obj;
  }};

  //Override models in restaurant so that we don't actually insert into the DB and we mock the database operations
  restaurant.setDatabase(mocks);

  it("Create a valid restaurant", function (done) {
    restaurant.save(req, res).then(function (result) {
      expect(res.obj.success).toBe(1);
      expect(res.obj.description).toBe("Restaurant Added");
      done();
    })
  })

});
