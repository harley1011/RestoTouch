var models = require("../../database/models");
var restaurantModel;
var restaurantLanguageModel;
var restaurantsTranslations;
var businessHoursModel;
var paymentsModel;
var menuModel;
var menuTranslationModel;
var kitchenStationsModel;
var kitchenTranslationModel;
var kitchenServModel;
var categoryModel;
var itemModel;
var itemSizeModel;
var itemSizeTranslationModel
var itemTranslationModel;
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
  menuTranslationModel = models.getMenuTranslationsModel();
  restaurantLanguageModel = models.getRestaurantsLanguageModel();
  restaurantsTranslations = models.getRestaurantsTranslationModel();
  businessHoursModel = models.getBusinessHoursModel();
  paymentsModel = models.getPaymentsModel();
  kitchenStationsModel = models.getKitchenStationModel();
 // kitchenTranslationModel = models.getKitchenTranslationModel();
  kitchenServModel = models.getKitchenServModel();
  categoryModel = models.getCategoryModel();
  itemModel = models.getItemModel();
  itemTranslationModel = models.getItemTranslationModel();
  itemSizeModel = models.getItemSizesModel();
  itemSizeTranslationModel = models.getItemSizeTranslationsModel();
}

//GET /restaurant
function getAll(req, res) {
  return restaurantModel.findAll({
    where: {userId: req.userId},
    include: [{
      model: restaurantsTranslations,
      as: 'translations'
    }, {
      model: menuModel, include: [{
        model: menuTranslationModel,
        as: 'translations'
      }]
    }, {
      model: businessHoursModel,
      as: 'businessHours'
    }, {
      model: paymentsModel,
      as: 'payments'
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
    },
    {
      model: kitchenStationsModel,
      as: 'kitchenStations',
      include:[
    //    {model: kitchenTranslationModel, as: 'translations'},
        {model: itemModel, as: 'kitItem',
          include: [
            { model: itemSizeModel, as: 'sizes',
              include: [
                { model: itemSizeTranslationModel, as: 'translations'}
                ]
            },
            { model: itemTranslationModel, as: 'translations' }
          ]
        }
        ]
    }
    , {
      model: paymentsModel,
      as: 'payments'
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
      model: menuModel, include: [{
        model: menuTranslationModel,
        as: 'translations'
      }]
    }, {
      model: businessHoursModel,
      as: 'businessHours'
    },
    {
      model: paymentsModel,
      as: 'payments'
    }]
  }).then(function (restaurant) {
    kitchenStationsModel.findAll({where: {restaurantId: restaurant.id}, include: [
      {model: itemModel, as: 'kitItem',
        include: [
          { model: itemSizeModel, as: 'sizes',
            include: [
              { model: itemSizeTranslationModel, as: 'translations'}
            ]
          },
          { model: itemTranslationModel, as: 'translations' },
          { model: categoryModel, as: 'categories'}
        ]
      }
    ]}).then(function (kitStation) {
      restaurant.dataValues.kitchenStations = kitStation;
      if (restaurant) {
        return res.json(restaurant);
      } else {
        res.status(204).send();
      }
    });

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
    },
    {
      model: kitchenStationsModel,
      as: 'kitchenStations',
      include:[
      //  {model: kitchenTranslationModel, as: 'translations'},
        {model: itemModel, as: 'kitItem',
          include: [
            { model: itemSizeModel, as: 'sizes',
              include: [
                { model: itemSizeTranslationModel, as: 'translations'}
                ]
            },
            { model: itemTranslationModel, as: 'translations' },
            { model: categoryModel, as: 'categories'}
          ]
        }
        ]
    },
    {
      model: paymentsModel,
      as: 'payments'
    }]
  }).then(function (oldRestaurant) {

    //Find what's new and what has been removed
    var languagesToRemove = _.differenceBy(oldRestaurant.supportedLanguages, restaurant.supportedLanguages, 'languageCode');
    var newLanguagesToAdd = _.differenceBy(restaurant.supportedLanguages, oldRestaurant.supportedLanguages, 'languageCode');
    var businessHoursToRemove = _.differenceBy(oldRestaurant.businessHours, restaurant.businessHours, 'id');
    var businessHoursToAdd = _.differenceBy(restaurant.businessHours, oldRestaurant.businessHours, 'id');
    var businessHoursToUpdate = _.intersectionBy(restaurant.businessHours, oldRestaurant.businessHours, 'id');
    var paymentsToRemove = _.differenceBy(oldRestaurant.payments, restaurant.payments, 'id');
    var paymentsToAdd = _.differenceBy(restaurant.payments, oldRestaurant.payments, 'id');
    var paymentsToUpdate = _.intersectionBy(restaurant.payments, oldRestaurant.payments, 'id');
    var kitchenStationToRemove =_.differenceBy(oldRestaurant.kitchenStations, restaurant.kitchenStations, 'id');
    var kitchenToAdd = _.differenceBy(restaurant.kitchenStations, oldRestaurant.kitchenStations, 'id');
    var kitchenToUpdate = _.intersectionBy(restaurant.kitchenStations, oldRestaurant.kitchenStations, 'id');

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

    paymentsToAdd.forEach(function (payment) {
      payment.restaurantId = oldRestaurant.id;
    });
    paymentsModel.bulkCreate(paymentsToAdd);

    paymentsToRemove.forEach(function (payment) {
      paymentsModel.destroy({where: {id: payment.id}});
    });

    paymentsToUpdate.forEach(function (payment) {
      paymentsModel.update(payment, {where: {id: payment.id}});
    });

    //------------------KITCHEN STATION MODE------------------
    kitchenToUpdate.forEach(function (kit) {
      kitchenStationsModel.update(kit, {where: {id: kit.id}});
    });

    kitchenStationToRemove.forEach(function (kit) {
      kitchenStationsModel.destroy({where: {id: kit.id}});
    });

    kitchenToAdd.forEach(function (kit) {
      kit.restaurantId = oldRestaurant.id;
    });
    kitchenStationsModel.bulkCreate(kitchenToAdd, {individualHooks: true}).then(function(result){

      restaurant.kitchenStations.forEach(function(station){
        result.forEach(function(re){
          if(station.name === re.name){
            station.id = re.id;
          }
        });
      });

      restaurant.kitchenStations.forEach(function(station){
        station.kitItem.forEach(function(item) {
          kitchenServModel.findOrCreate({where: {kitchenStationId: station.id, itemId: item.id}}).spread(function() {});
        });
      });

      // level 2 comparison item in each kitchen station
      var adjustedOldKitStation = _.xor(oldRestaurant.kitchenStations, kitchenStationToRemove);
      adjustedOldKitStation = _.xor(adjustedOldKitStation, kitchenToAdd);
      adjustedOldKitStation = _.concat(adjustedOldKitStation, kitchenToUpdate);

      var ksItemToAdd;
      var ksItemToRemove;
      var ksItemToUpdate;
      var ksCollection = [];

      adjustedOldKitStation.forEach(function(station) {
        var stationMatch = _.find(restaurant.kitchenStations, function(newStation) {return newStation.id == station.id});
        ksItemToRemove = _.differenceBy(station.kitItem, stationMatch.kitItem, 'id');
        ksItemToAdd = _.differenceBy(stationMatch.kitItem, station.kitItem, 'id');
        ksItemToUpdate = _.intersectionBy(stationMatch.kitItem, station.kitItem, 'id');

        ksItemToAdd.forEach(function(item) {
          ksCollection.push({kitchenStationId: station.id, itemId: item.id });
        });
        kitchenServModel.bulkCreate(ksCollection);

        ksItemToRemove.forEach(function(item) {
          kitchenServModel.destroy({where: {kitchenStationId: station.id, itemId: item.id}});
        });

        ksItemToUpdate.forEach(function (item) {
          kitchenServModel.update(item, {where: {kitchenStationId: station.id, itemId: item.id}});
          kitchenServModel.findOrCreate({where: {kitchenStationId: station.id, itemId: item.id}}).spread(function() {});
        });
      });  // end of adjustedOldKitStation

    });
    //------------------END KITCHEN STATION MODE------------------

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
