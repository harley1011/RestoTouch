var models = require("../../database/models");
var restaurantModel;
var restaurantLanguageModel;
var restaurantsTranslations;
var _ = require('lodash');

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
  restaurantsTranslations = models.getRestaurantsTranslationModel();
}

//GET /restaurant
function getAll(req, res) {
  return restaurantModel.findAll({
    where: {userId: req.userId},
    include: [{model: restaurantsTranslations, as: 'translations'}]
  }).then(function (restaurants) {
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
    }, {model: restaurantsTranslations, as: 'translations'}]
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

  return restaurantModel.findOne({
    where: {id: restaurant.id},
    include: [{model: restaurantLanguageModel, as: 'supportedLanguages'}]
  }).then(function (oldRestaurant) {

    //Find what's new and what has been removed
    var languagesToRemove = _.differenceBy(oldRestaurant.supportedLanguages, restaurant.supportedLanguages, 'code');
    var newLanguagesToAdd = _.differenceBy(restaurant.supportedLanguages, oldRestaurant.supportedLanguages, 'code');


    for (var prop in restaurant) {
      oldRestaurant[prop] = restaurant[prop];
    }
    oldRestaurant.save().then(function (result) {

      languagesToRemove.forEach(function (language) {
        restaurantLanguageModel.destroy({where: {'code': language.code, 'restaurantId': restaurant.id}});
      })

      newLanguagesToAdd.forEach(function (language) {
        language.restaurantId = restaurant.id;
        //todo: see why this isn't working
        // var restaurantLanguage = restaurantLanguageModel.create(language);
        //  oldRestaurant.addSupportedLanguage(restaurantLanguage);
      })

      return res.json({success: 1, description: "Restaurant Updated"});
    });
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
