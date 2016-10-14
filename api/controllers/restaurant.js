var models = require("../../database/models");
var restaurantModel;
var restaurantLanguageModel;
setDatabase(models);

module.exports = {
  getAll: getAll,
  save: save,
  get: get,
  update: update,
  del: del,
  setDatabase: setDatabase
};

function setDatabase(m) {
  models = m;
  restaurantModel = models.getRestaurantModel();
  restaurantLanguageModel = models.getRestaurantsLanguageModel();
}

//GET /restaurant
function getAll(req, res) {
  return restaurantModel.findAll({where: {userId: req.userId}}).then(function (restaurants) {
    return res.json({restaurants: restaurants});
  });
}

//POST /restaurant
function save(req, res) {
  var restaurant = req.body;
  restaurant.userId = req.userId;
  return restaurantModel.create(restaurant, {
    include: [{
      model: restaurantLanguageModel,
      as: 'supportedLanguages'
    }]
  }).then(function (result) {
    return res.json({success: 1, description: "Restaurant Added"});
  });
}

//GET /restaurant/{name}
function get(req, res) {
  var name = req.swagger.params.name.value;
  return restaurantModel.findOne({
    where: {
      name: name,
      userId: req.userId
    },
    include: [{model: restaurantLanguageModel, as: 'supportedLanguages'}]
  }).then(function (restaurant) {
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
      name: name,
      userId: req.userId
    },
    include: [
      {model: restaurantLanguageModel, as: 'supportedLanguages'}
    ]
  }).then(function (result) {
    return res.json({success: 1, description: "Restaurant Updated"});
  });
}

//DELETE /restaurant/{name}
function del(req, res) {
  var name = req.swagger.params.name.value;
  return restaurantModel.destroy({
    where: {
      name: name,
      userId: req.userId
    }
  }).then(function (result) {
    return res.json({success: 1, description: "Restaurant Deleted"});
  });
}
