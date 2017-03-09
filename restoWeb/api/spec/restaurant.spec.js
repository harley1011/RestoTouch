var restaurant = require('../controllers/restaurant');
var mocks = require('./mocks/mocks');

describe("The Restaurant API", function() {

  var res = {
    json: function (obj) {
      res.obj = obj;
    }
  };

  //Override models in restaurant so that we don't actually insert into the DB and we mock the database operations
  restaurant.setDatabase(mocks);

  it("should create a valid restaurant", function (done) {
    var req = {
      body: {
        "id": 2,
        "address": "Address",
        "mOpen": "9:00",
        "mClose": "9:00",
        "tuOpen": "9:00",
        "tuClose": "9:00",
        "wOpen": "9:00",
        "wClose": "9:00",
        "thOpen": "9:00",
        "thClose": "9:00",
        "fOpen": "9:00",
        "fClose": "9:00",
        "saOpen": "9:00",
        "saClose": "9:00",
        "suOpen": "9:00",
        "suClose": "9:00",
        "supportedLanguages": [{"languageCode":"en","name":"English","restaurantId":2}],
        "Menus":[],
        "selectedTranslation": [{"languageCode":"en","language":null,"name":"ENname","description":"ENDesc","restaurantId":2}],
        "kitCashModeFlag": "kco"
      }
    }

    restaurant.save(req, res).then(function (result) {
      expect(res.obj.success).toBe(1);
      expect(res.obj.description).toBe("Restaurant Added");
      done();
    })
  })
  //todo; update
  it("should update a restaurant", function (done) {
    // var req = {
    //   body: {
    //     "id": 2,
    //     "address": "Address",
    //     "mOpen": "9:00",
    //     "mClose": "9:00",
    //     "tuOpen": "9:00",
    //     "tuClose": "9:00",
    //     "wOpen": "9:00",
    //     "wClose": "9:00",
    //     "thOpen": "9:00",
    //     "thClose": "9:00",
    //     "fOpen": "9:00",
    //     "fClose": "9:00",
    //     "saOpen": "9:00",
    //     "saClose": "9:00",
    //     "suOpen": "9:00",
    //     "suClose": "9:00",
    //     "supportedLanguages": [{"languageCode":"en","name":"English","restaurantId":2}],
    //     "Menus":[],
    //     "selectedTranslation": [{"languageCode":"en","language":null,"name":"ENname","description":"ENDesc","restaurantId":2}]
    //   },
    //   swagger: {
    //     params: {
    //       id: {
    //         value: 1
    //       }
    //     }
    //   }
    // }
    //
    // restaurant.update(req, res).then(function (result) {
    //   expect(res.obj.success).toBe(1);
    //   expect(res.obj.description).toBe("Restaurant Updated");
    //   done();
    // })
    done();
  })

  it("should get all restaurants", function (done) {
    var req = {};

    restaurant.getAll(req, res).then(function (result) {
      expect(Array.isArray(res.obj.restaurants)).toBe(true);
      expect(typeof res.obj.restaurants[0]).toBe('object');
      done();
    })
  })

  it("should get a restaurant", function (done) {
    var req = {
      swagger: {
        params: {
          id: {
            value: 1
          }
        }
      }
    }

    restaurant.get(req, res).then(function (result) {
      expect(typeof res.obj).toBe('object');
      expect(res.obj.id).toBe(req.swagger.params.id.value);
      done();
    })
  })

  it("should delete a restaurant", function (done) {
    var req = {
      swagger: {
        params: {
          id: {
            value: 1
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
