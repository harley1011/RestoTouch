var models = require("../../database/models");
var itemModel;
var itemSizeModel;

var _ = require('lodash');


setDatabase(models);

module.exports = {
  getAllItems: getAll,
  addItem: save,
  getItem: get,
  updateItem: update,
  deleteItem: del,
  setDatabase: setDatabase
};

function setDatabase(m) {
  models = m;
  itemModel = models.getItemModel();
  itemSizeModel = models.getItemSizesModel();
}


function getAll(req, res) {
  return itemModel.findAll({
    where: {userId: req.userId},
    include: [{model: itemSizeModel, as: 'sizes'}]
  }).then(function (items) {
    return res.json({items: items});
  });
}

function save(req, res) {
   var item = req.body;
   item.userId = req.userId;

   return itemModel.create(item, {
     include: [{
      model: itemSizeModel,
      as: 'sizes'
    }]
  }).then(function (result) {
    return res.json({success: 1, description: "Items Added"});
  });
}

//GET /item/{id}
function get(req, res) {
  var id = req.swagger.params.id.value;
  return itemModel.findOne({
    where: {
      id: id,
      userId: req.userId
    },
    include: [{model: itemSizeModel, as: 'sizes'}]
  }).then(function (item) {
    if (item) {
      return res.json(item);
    } else {
      res.status(204).send();
    }
  });
}

//PUT /restaurant/{id}
function update(req, res) {
  // var restaurant = req.body;
  //
  // return restaurantModel.findOne({
  //   where: {id: restaurant.id},
  //   include: [{model: restaurantLanguageModel, as: 'supportedLanguages'},
  //     {model: restaurantsTranslations, as: 'translations'}]
  // }).then(function (oldRestaurant) {
  //
  //
  //   //Find what's new and what has been removed
  //   var languagesToRemove = _.differenceBy(oldRestaurant.supportedLanguages, restaurant.supportedLanguages, 'languageCode');
  //   var newLanguagesToAdd = _.differenceBy(restaurant.supportedLanguages, oldRestaurant.supportedLanguages, 'languageCode');
  //
  //
  //   for (var prop in restaurant) {
  //     if (prop != 'translations')
  //       oldRestaurant[prop] = restaurant[prop];
  //   }
  //
  //   oldRestaurant.translations.forEach(function(translation) {
  //     var newTranslation = _.find(restaurant.translations, function (tr) {return tr.languageCode === translation.languageCode});
  //     for (var prop in newTranslation) {
  //       translation[prop] = newTranslation[prop];
  //     }
  //     translation.save();
  //     _.remove(restaurant.translations, function (tr) {return tr.languageCode === translation.languageCode});
  //   });
  //
  //   restaurant.translations.forEach(function (translation) {
  //     translation.restaurantId = restaurant.id;
  //   });
  //   // Create the new translations
  //   restaurantsTranslations.bulkCreate(restaurant.translations);
  //
  //   oldRestaurant.save().then(function (result) {
  //     languagesToRemove.forEach(function (language) {
  //       restaurantLanguageModel.destroy({where: {'languageCode': language.languageCode, 'restaurantId': restaurant.id}});
  //       restaurantsTranslations.destroy({where: {'languageCode': language.languageCode, 'restaurantId': restaurant.id}});
  //       _.remove(oldRestaurant.translations, function (translation) { return translation.languageCode == language.languageCode});
  //     })
  //
  //     newLanguagesToAdd.forEach(function (language) {
  //       language.restaurantId = restaurant.id;
  //       //todo: see why this isn't working
  //       // var restaurantLanguage = restaurantLanguageModel.create(language);
  //       //  oldRestaurant.addSupportedLanguage(restaurantLanguage);
  //     })
  //
  //     restaurantLanguageModel.bulkCreate(newLanguagesToAdd).then(function (result) {
  //       return res.json({success: 1, description: "Restaurant Updated"});
  //     })
  //
  //
  //
  //   });
  // });
}

//DELETE /item/{item}
function del(req, res) {
  var id = req.swagger.params.id.value;
  return itemModel.destroy({
    where: {
      id: id,
      userId: req.userId
    }
  }).then(function (result) {
    return res.json({success: 1, description: "Item Deleted"});
  });
}
