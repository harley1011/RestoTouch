var models = require("../../database/models");
var s3File = require("./s3File");
var itemModel;
var itemSizeModel;
var itemTranslationModel;
var ingredientGroupModel;
var ingredientModel;
var categoryModel;

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
  itemTranslationModel = models.getItemTranslationModel();
  ingredientGroupModel = models.getIngredientGroupModel();
  ingredientModel = models.getIngredientModel();
  categoryModel = models.getCategoryModel();
}


function getAll(req, res) {
  return itemModel.findAll({
    where: {userId: req.userId},
    include: [{
      model: itemSizeModel,
      as: 'sizes'
    }, {
      model: itemTranslationModel,
      as: 'translations'
    }, {
      model: categoryModel,
      as: 'categories'
    }],
    //order: ['name']
  }).then(function (items) {
    return res.json({items: items});
  });
}

function save(req, res) {
  var item = req.body;
  item.userId = req.userId;

  if (!item.sizes || item.sizes.length == 0) {
    res.status(400);
    return res.json({message: "At least one size is required"});
  }

  itemModel.create(item, {
    include: [{
      model: itemSizeModel,
      as: 'sizes'
    }, {
      model: itemTranslationModel,
      as: 'translations'
    }, {
      model: ingredientGroupModel,
      as: 'ingredientGroups',
      include: [{
        model: ingredientModel,
        as: 'ingredients'
      }]
    }]
  }).then(function (result) {
    return res.json({success: 1, description: "Item Added"});
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
    include: [{
      model: itemSizeModel,
      as: 'sizes'
    }, {
      model: itemTranslationModel,
      as: 'translations'
    }, {
      model: ingredientGroupModel,
      as: 'ingredientGroups',
      include: [{
        model: ingredientModel,
        as: 'ingredients'
      }]
    }, {
      model: categoryModel,
      as: 'categories'
    }]
  }).then(function (item) {
    if (item) {
      return res.json(item);
    } else {
      res.status(204).send();
    }
  });
}

//PUT /item/{id}
function update(req, res) {
  var item = req.body;

  itemModel.findOne({
      where: {id: item.id},
      include: [{model: itemSizeModel, as: 'sizes'},
        {model: itemTranslationModel, as: 'translations'},
        {
          model: ingredientGroupModel, as: 'ingredientGroups',
          include: [{
            model: ingredientModel,
            as: 'ingredients'
          }]
        }]
    }
  ).then(function (oldItem) {

    var sizesToRemove = _.differenceBy(oldItem.sizes, item.sizes, 'id');
    var sizesToAdd = _.differenceBy(item.sizes, oldItem.sizes, 'id');

    var ingredientGroupsToAdd = _.differenceBy(item.ingredientGroups, oldItem.ingredientGroups, 'id');
    var ingredientGroupsToRemove = _.differenceBy(oldItem.ingredientGroups, item.ingredientGroups, 'id');
    var ingredientGroupsToCheckForUpdate = _.differenceBy(_.differenceBy(item.ingredientGroups, ingredientGroupsToAdd, 'id'), ingredientGroupsToRemove, 'id');

    if (item.imageUrl != oldItem.imageUrl) {
      var split = oldItem.imageUrl.split('/');
      req.imageKey = split[split.length - 1];
      s3File.deleteImage(req, res);
    }

    for (var prop in item) {
      if (prop != 'translations' && prop != 'ingredientGroups')
        oldItem[prop] = item[prop];
    }

    ingredientGroupsToAdd.forEach(function (ingredientGroup) {
      ingredientGroup.itemId = oldItem.id;
    });

    ingredientGroupModel.bulkCreate(ingredientGroupsToAdd);

    sizesToAdd.forEach(function (size) {
      size.itemId = oldItem.id;
    });

    ingredientGroupsToCheckForUpdate.forEach(function (ingredientGroup) {
      var ingredientGroupToCheck = _.find(oldItem.ingredientGroups, {'id': ingredientGroup.id});
      var ingredientToAdd = _.differenceBy(ingredientGroup.ingredients, ingredientGroupToCheck.ingredients, 'id');
      var ingredientToRemove = _.differenceBy(ingredientGroupToCheck.ingredients, ingredientGroup.ingredients, 'id');

      ingredientGroupToCheck.name = ingredientGroup.name;
      ingredientGroupToCheck.maxNumberOfIngredients = ingredientGroup.maxNumberOfIngredients;
      ingredientGroupToCheck.minNumberOfIngredients = ingredientGroup.minNumberOfIngredients;
      ingredientGroupToCheck.orderPriority = ingredientGroup.orderPriority;
      ingredientGroupToCheck.save();

      ingredientToAdd.forEach(function (ingredient) {
        ingredient.ingredientGroupId = ingredientGroup.id;
      });
      ingredientModel.bulkCreate(ingredientToAdd);

      ingredientToRemove.forEach(function (ingredient) {
        ingredientModel.destroy({where: {id: ingredient.id}})
      });
    });

    itemSizeModel.bulkCreate(sizesToAdd);

    ingredientGroupsToRemove.forEach(function (ingredientGroup) {
      ingredientGroupModel.destroy({where: {id: ingredientGroup.id}})
    });

    sizesToRemove.forEach(function (size) {
      itemSizeModel.destroy({where: {id: size.id}})
    });

    oldItem.translations.forEach(function (translation) {
      var newTranslation = _.find(item.translations, function (tr) {
        return tr.languageCode === translation.languageCode
      });
      for (var prop in newTranslation) {
        translation[prop] = newTranslation[prop];
      }
      translation.save();
      _.remove(item.translations, function (tr) {
        return tr.languageCode === translation.languageCode
      });
    });

    item.translations.forEach(function (translation) {
      translation.itemId = item.id;
    })

    itemTranslationModel.bulkCreate(item.translations);

    oldItem.save().then(function (result) {
      return res.json({success: 1, description: "Item updated"});
    })
  });
}

//DELETE /item/{item}
function del(req, res) {
  var id = req.swagger.params.id.value;
  return itemModel.findOne({
    where: {
      id: id,
      userId: req.userId
    }
  }).then(function (item) {
    if (item) {
      if (item.imageUrl) {
        var split = item.imageUrl.split('/');
        req.imageKey = split[split.length - 1];
        s3File.deleteImage(req, res);
      }
      item.destroy();
      return res.json({success: 1, description: "Item Deleted"});
    } else {
      res.status(204).send();
    }
  });
};
