var item = require('../controllers/item');
var mocks = require('./mocks/mocks');

describe("The Item API", function() {

  var res = {
    json: function (obj) {
      res.obj = obj;
    }
  };

  //Override models in restaurant so that we don't actually insert into the DB and we mock the database operations
  item.setDatabase(mocks);

});
