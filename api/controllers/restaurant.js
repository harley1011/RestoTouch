var models = require("../../database/models");
var restaurantModel;
var restaurantLanguageModel;
var restaurantsTranslations;
var businessHoursModel;
var menuModel;
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
  menuModel = models.getMenuModel();
  restaurantLanguageModel = models.getRestaurantsLanguageModel();
  restaurantsTranslations = models.getRestaurantsTranslationModel();
  businessHoursModel = models.getBusinessHoursModel();
}

//GET /restaurant
function getAll(req, res) {
  return restaurantModel.findAll({
    where: {userId: req.userId},
    include: [{
      model: restaurantsTranslations,
      as: 'translations'
    }, {
      model: menuModel
    }, {
      model: businessHoursModel,
      as: 'businessHours'
    }]
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
    }, {
      model: restaurantsTranslations,
      as: 'translations'
    }, {
      model: businessHoursModel,
      as: 'businessHours'
    }]
  }).then(function (result) {
    return res.json({success: 1, description: "Restaurant Added"});
  });
}

//GET /restaurant/{name}
function get(req, res) {
  var name = req.swagger.params.id.value;
  return restaurantModel.findOne({
    where: {
      id: name,
      userId: req.userId
        },
    include: [{
      model: restaurantLanguageModel,
      as: 'supportedLanguages'
    }, {
      model: restaurantsTranslations,
      as: 'translations'
    }, {
      model: menuModel
    }, {
      model: businessHoursModel,
      as: 'businessHours'
    }]
  }).then(function (restaurant) {
    if (restaurant) {
      return res.json(restaurant);
    } else {
      res.status(204).send();
    }
  });
}

//PUT /restaurant/{id}
function update(req, res) {
  var restaurant = req.body;

  return restaurantModel.findOne({
    where: {id: restaurant.id},
    include: [{
      model: restaurantLanguageModel,
      as: 'supportedLanguages'
    }, {
      model: restaurantsTranslations,
      as: 'translations'
    }, {
      model: businessHoursModel,
      as: 'businessHours'
    }]
  }).then(function (oldRestaurant) {

    //Find what's new and what has been removed
    var languagesToRemove = _.differenceBy(oldRestaurant.supportedLanguages, restaurant.supportedLanguages, 'languageCode');
    var newLanguagesToAdd = _.differenceBy(restaurant.supportedLanguages, oldRestaurant.supportedLanguages, 'languageCode');
    var businessHoursToRemove = _.differenceBy(oldRestaurant.businessHours, restaurant.businessHours, 'id');
    var businessHoursToAdd = _.differenceBy(restaurant.businessHours, oldRestaurant.businessHours, 'id');
    var businessHoursToUpdate = _.intersectionBy(restaurant.businessHours, oldRestaurant.businessHours, 'id');

    for (var prop in restaurant) {
      if (prop != 'translations')
        oldRestaurant[prop] = restaurant[prop];
    }

    businessHoursToAdd.forEach(function (businessHour) {
      businessHour.restaurantId = oldRestaurant.id;
    });
    businessHoursModel.bulkCreate(businessHoursToAdd);

    businessHoursToRemove.forEach(function (businessHour) {
      businessHoursModel.destroy({where: {id: businessHour.id}});
    });

    businessHoursToUpdate.forEach(function (businessHour) {
      businessHoursModel.update(businessHour, {where: {id: businessHour.id}});
    });

    oldRestaurant.translations.forEach(function(translation) {
      var newTranslation = _.find(restaurant.translations, function (tr) {return tr.languageCode === translation.languageCode});
      for (var prop in newTranslation) {
          translation[prop] = newTranslation[prop];
      }
      translation.save();
      _.remove(restaurant.translations, function (tr) {return tr.languageCode === translation.languageCode});
    });

    restaurant.translations.forEach(function (translation) {
      translation.restaurantId = restaurant.id;
    });
    // Create the new translations
    restaurantsTranslations.bulkCreate(restaurant.translations);

    oldRestaurant.save().then(function (result) {
      languagesToRemove.forEach(function (language) {
        restaurantLanguageModel.destroy({where: {'languageCode': language.languageCode, 'restaurantId': restaurant.id}});
        restaurantsTranslations.destroy({where: {'languageCode': language.languageCode, 'restaurantId': restaurant.id}});
        _.remove(oldRestaurant.translations, function (translation) { return translation.languageCode == language.languageCode});
      })

      newLanguagesToAdd.forEach(function (language) {
        language.restaurantId = restaurant.id;
        //todo: see why this isn't working
        // var restaurantLanguage = restaurantLanguageModel.create(language);
        //  oldRestaurant.addSupportedLanguage(restaurantLanguage);
      })

      restaurantLanguageModel.bulkCreate(newLanguagesToAdd).then(function (result) {
        return res.json({success: 1, description: "Restaurant Updated"});
      })
    });
  });
}

//DELETE /restaurant/{name}
function del(req, res) {
  var id = req.swagger.params.id.value;
  return restaurantModel.destroy({
    where: {
      id: id,
      userId: req.userId
    }
  }).then(function (result) {
    return res.json({success: 1, description: "Restaurant Deleted"});
  });
}
