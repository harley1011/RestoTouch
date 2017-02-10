var models = require("../../database/models");
var comboModel;
var comboTranslationModel;
var categoryModel;
var categoryTranslationModel;
var itemModel;
var itemTranslationModel;
var itemCategoryModel;
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
      model: itemModel,
      as: 'items',
      include: [{
        model: itemTranslationModel,
        as: 'translations'
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
    },
    include: [{
      model: comboTranslationModel,
      as: 'translations'
    }, {
      model: itemModel,
      as: 'items',
      include: [{
        model: itemTranslationModel,
        as: 'translations'
      }]
    }]
  }).then(function (combo) {
    if (combo) {
      return res.json(combo);
    } else {
      res.status(204).send();
    }
  });
}

// POST /combo
function addCombo(req, res) {

  var combo = req.body;
  combo.userId = req.userId;

  return comboModel.create(combo, {
    include: [{
      model: comboTranslationModel,
      as: 'translations'
    }]
  }).then(function (result) {
    var itemComboAssociations = [];
    combo.items.forEach(function (item) {
      itemComboAssociations.push({itemId: item.id, comboId: result.id, categoryId: null}); /// TODO CHANGE categoryId
    })
    comboCatFoodItemModel.bulkCreate(itemComboAssociations);
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
      itemComboAssociations.push({itemId: item.id, comboId: oldCombo.id});
    });
    comboCatFoodItemModel.bulkCreate(itemComboAssociations);

    itemsToRemove.forEach(function (item) {
      comboCatFoodItemModel.destroy({where: {itemId: item.id, comboId: oldCombo.id}});
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

