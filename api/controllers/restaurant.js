var models = require("../../database/models");
var restaurantModel = models.getRestaurantModel();

module.exports = {
  getAll: getAll,
  save: save,
  get: get,
  update: update,
  del: del
};

//GET /restaurant
function getAll(req, res, next) {
  restaurantModel.findAll().then(function(restaurants) {
    res.json({ restaurants: restaurants });
  });
}

//POST /restaurant
function save(req, res, next) {
  var restaurant = req.body;
  restaurantModel.create(restaurant).then(function(result) {
    return res.json({success: 1, description: "Restaurant Added"});
  });
}

//GET /restaurant/{name}
function get(req, res, next) {
  var name = req.swagger.params.name.value;
  restaurantModel.findOne({
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
function update(req, res, next) {
  var restaurant = req.body;
  console.log(restaurant);
  var name = req.swagger.params.name.value;
  restaurantModel.update(restaurant, {
    where: {
      name: name
    }
  }).then(function(result) {
    return res.json({success: 1, description: "Restaurant Updated"});
  });
}

//DELETE /restaurant/{name}
function del(req, res, next) {
  var name = req.swagger.params.name.value;
  restaurantModel.destroy({
    where: {
      name: name
    }
  }).then(function(restaurant) {
    return res.json({success: 1, description: "Restaurant Deleted"});
  });
}
