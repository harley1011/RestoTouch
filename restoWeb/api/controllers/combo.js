var models = require("../../database/models");
var comboModel;
var comboTranslationModel;
var comboCatFoodItemModel;
var categoryModel;
var categoryTranslationModel;
var itemModel;
var itemTranslationModel;
var itemSizeModel;
var itemSizeTranslationModel;
var _ = require('lodash');

setDatabase(models);

module.exports = {
  getAllCombos: getAllCombos,
  getCombo: getCombo,
  addCombo: addCombo,
  updateCombo: updateCombo,
  deleteCombo: deleteCombo,
  setDatabase: setDatabase
};

function setDatabase(m) {
  models = m;
  comboModel = models.getComboModel();
  comboTranslationModel = models.getComboTranslationModel();
  categoryModel = models.getCategoryModel();
  categoryTranslationModel = models.getCategoryTranslationModel();
  itemModel = models.getItemModel();
  itemSizeModel = models.getItemSizesModel();
  itemSizeTranslationModel = models.getItemSizeTranslationsModel();
  itemTranslationModel = models.getItemTranslationModel();
  comboCatFoodItemModel = models.getComboCatFoodItemModel();
}

// GET /combo
function getAllCombos(req, res) {
  console.log('combo:');
  return comboModel.findAll({
    where: {userId: req.userId},
    include: [{
      model: comboTranslationModel,
      as: 'translations'
    }, {
      model: categoryModel,
        as: 'categories',
        include: [{
            model: categoryTranslationModel,
            as: 'translations'
          }, {
            model: itemModel,
            as: 'items'
    }]
    }]
  }).then(function (combos) {
    return res.json({combos: combos});
  });
}

// GET /combo/{id}
function getCombo(req, res) {
    console.log('combo with id:');
  var id = req.swagger.params.id.value;

  return comboModel.findOne({
    where: {
      id: id,
      userId: req.userId
    }, include: [ {
        model: categoryModel,
        as: 'categories',
        include: [{
            model: categoryTranslationModel,
            as: 'translations'
          }, {
            model: itemModel,
            as: 'items',
            include: [{
                model: itemTranslationModel,
                as: 'translations'
          }, {
            model: itemSizeModel,
            as: 'sizes',
            include: [{
                model: itemSizeTranslationModel,
                as: 'translations'
              }]
          }]
      }]}, {
        model: comboTranslationModel,
        as: 'translations'
    }]
  }).then(function (combo) {
    combo.categories.forEach(function(cat){
            cat.items.forEach(function(item){
              for(i=0; i< item.sizes.length; i++){
                if(item.ComboCatFoodItem.itemSizesId != item.sizes[i].id){
                  item.sizes.splice(i,1);
                }
             }
      });
    });
    if (combo) {
      return res.json(combo);
    } else {
      res.status(204).send();
    }
  });
}

// POST /combo
function addCombo(req, res) {
  console.log("have u reach me?");
  var combo = req.body;
  combo.userId = req.userId;

  return comboModel.create(combo, {
    include: [{
      model: comboTranslationModel,
      as: 'translations'
    }]
  }).then(function (result) {
    console.warn('result back from swagger : ', result);
    var itemComboAssociations = [];
    // combo.items.forEach(function (item) {
    //   itemComboAssociations.push({comboId: result.id, categoryId: '1', itemId: '1', itemSizesId: '1' });
    // })
    // comboCatFoodItemModel.bulkCreate(itemComboAssociations)
      combo.categories.forEach(function (cat) {
          cat.items.forEach(function(item){
            console.log('hellloooo anyone here?');
            console.warn(item);
            itemComboAssociations.push({comboId: result.id, categoryId: cat.id, itemId: item.id, itemSizesId: item.sizes[0].id});
          });
       });
    comboCatFoodItemModel.bulkCreate(itemComboAssociations)
    return res.json({success: 1, description: "New Combo added"});
  });
}


// DELETE /combo/{id}
function deleteCombo(req, res) {
  var id = req.swagger.params.id.value;
  return comboModel.destroy({
    where: {
      id: id,
      userId: req.userId
    }
  }).then(function (result) {
    return res.json({success: 1, description: "Combo deleted"});
  });
}

  //PUT /combo/{id}
function updateCombo(req, res) {
  var combo = req.body;
  var id = req.swagger.params.id.value;
  return comboModel.findOne({
    where: {
      id: id,
      userId: req.userId
    },
    include: [{
      model: comboTranslationModel,
      as: 'translations'
    }, {
      model: itemModel,
      as: 'items'
    }]
  }).then(function (oldCombo) {

    var itemsToRemove = _.differenceBy(oldCombo.items, combo.items, 'id');
    var itemsToAdd = _.differenceBy(combo.items, oldCombo.items, 'id');

    var itemComboAssociations = [];
    itemsToAdd.forEach(function (item) {
      itemComboAssociations.push({comboId: oldCombo.id, categoryId: item.categories.id, itemId: item.id, itemSizesId: item.sizes.id});
    });
    comboCatFoodItemModel.bulkCreate(itemComboAssociations);

    itemsToRemove.forEach(function (item) {
      comboCatFoodItemModel.destroy({where: {comboId: oldCombo.id, categoryId: item.categories.id, itemId: item.id, itemSizesId: item.sizes.id}});
    });

    for (var prop in combo) {
      if (prop != 'translations')
        oldCombo[prop] = combo[prop];
    }

    oldCombo.translations.forEach(function (translation) {
      var newTranslation = _.find(combo.translations, function (tr) {
        return tr.languageCode === translation.languageCode
      });
      for (var prop in newTranslation) {
        translation[prop] = newTranslation[prop];
      }
      translation.save();
      _.remove(combo.translations, function (tr) {
        return tr.languageCode === translation.languageCode
      });
    });

    combo.translations.forEach(function (translation) {
      translation.comboId = combo.id;
    });

    comboTranslationModel.bulkCreate(combo.translations);

    oldCombo.save().then(function (result) {
      return res.json({success: 1, description: 'Combo Updated'});
    });

  });
}

