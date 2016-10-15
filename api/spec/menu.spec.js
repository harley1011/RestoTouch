var menu = require('../controllers/menu');
var mocks = require('./mocks/mocks');

describe("The Menu API", function() {

  var res = {
    json: function (obj) {
      res.obj = obj;
    }
  };

  //Override models in menu so that we don't actually insert into the DB and we mock the database operations
  menu.setDatabase(mocks);

  it("should create a valid menu", function (done) {
    var req = {
      body: {
        "name": "Menu 1"
      }
    }

    menu.saveMenu(req, res).then(function (result) {
      expect(res.obj.success).toBe(1);
      expect(res.obj.description).toBe("Menu Added");
      done();
    })
  })

  it("should update a menu", function (done) {
    var req = {
      body: {
        "name": "Menu 1"
      },
      swagger: {
        params: {
          name: {
            value: "Menu 2"
          }
        }
      }
    }

    menu.updateMenu(req, res).then(function (result) {
      expect(res.obj.success).toBe(1);
      expect(res.obj.description).toBe("Menu Updated");
      done();
    })
  })

  it("should get all menus", function (done) {
    var req = {};

    menu.getAllMenu(req, res).then(function (result) {
      expect(Array.isArray(res.obj.menus)).toBe(true);
      expect(typeof res.obj.menus[0]).toBe('object');
      done();
    })
  })

  it("should get a menu", function (done) {
    var req = {
      swagger: {
        params: {
          name: {
            value: "Menu 1"
          }
        }
      }
    }

    menu.getMenu(req, res).then(function (result) {
      expect(typeof res.obj).toBe('object');
      expect(res.obj.name).toBe(req.swagger.params.name.value);
      done();
    })
  })

  it("should delete a menu", function (done) {
    var req = {
      swagger: {
        params: {
          name: {
            value: "Menu 1"
          }
        }
      }
    }

    menu.delMenu(req, res).then(function (result) {
      expect(res.obj.success).toBe(1);
      expect(res.obj.description).toBe("Menu Deleted");
      done();
    })
  })

});
