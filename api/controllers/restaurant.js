var models = require("../../database/models");
var restaurantModel;
setDatabase(models);

module.exports = {
  getAll: getAll,
  save: save,
  get: get,
  update: update,
  del: del,
  setDatabase: setDatabase
};

function setDatabase (m) {
  models = m;
  restaurantModel = models.getRestaurantModel();
}

//GET /restaurant
function getAll(req, res) {
  return restaurantModel.findAll().then(function(restaurants) {
    res.json({ restaurants: restaurants });
  });
}

//POST /restaurant
function save(req, res) {
  var restaurant = req.body;
  return restaurantModel.create(restaurant).then(function(result) {
    return res.json({success: 1, description: "Restaurant Added"});
  });
}

//GET /restaurant/{name}
function get(req, res) {
  var name = req.swagger.params.name.value;
  return restaurantModel.findOne({
    where: {
      name: name
    }
  }).then(function(restaurant) {
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(204).send();
    }
  });
}

//PUT /restaurant/{name}
function update(req, res) {
  var restaurant = req.body;
  var name = req.swagger.params.name.value;
  return restaurantModel.update(restaurant, {
    where: {
      name: name
    }
  }).then(function(result) {
    return res.json({success: 1, description: "Restaurant Updated"});
  });
}

//DELETE /restaurant/{name}
function del(req, res) {
  var name = req.swagger.params.name.value;
  return restaurantModel.destroy({
    where: {
      name: name
    }
  }).then(function(restaurant) {
    return res.json({success: 1, description: "Restaurant Deleted"});
  });
}
