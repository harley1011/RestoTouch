var models = require("../../database/models");
var s3File = require("./s3File");
var utility = require("../helpers/utility");
var _ = require('lodash');

var itemModel;
var itemSizeModel;
var itemTranslationModel;
var ingredientGroupModel;
var ingredientModel;
var categoryModel;
var itemSizeTranslationModel;
var ingredientGroupTranslationModel;
var ingredientTranslationModel;

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
  itemSizeTranslationModel = models.getItemSizeTranslationsModel();
  ingredientGroupTranslationModel = models.getIngredientGroupTranslationModel();
  ingredientTranslationModel = models.getIngredientTranslationModel();
}


function getAll(req, res) {
  return itemModel.findAll({
    where: {userId: req.userId},
    include: [{
      model: itemSizeModel,
      as: 'sizes',
      include: [{
        model: itemSizeTranslationModel,
        as: 'translations'
      }]
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
      as: 'sizes',
      include: [{
        model: itemSizeTranslationModel,
        as: 'translations'
      }]
    }, {
      model: itemTranslationModel,
      as: 'translations'
    }, {
      model: ingredientGroupModel,
      as: 'ingredientGroups',
      include: [{
        model: ingredientModel,
        as: 'ingredients',
        include: [{
          model: ingredientTranslationModel,
          as: 'translations'
        }]
      }, {
        model: ingredientGroupTranslationModel,
        as: 'translations'
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
      as: 'sizes',
      include: [{
        model: itemSizeTranslationModel,
        as: 'translations'
      }]
    }, {
      model: itemTranslationModel,
      as: 'translations'
    }, {
      model: ingredientGroupModel,
      as: 'ingredientGroups',
      include: [{
        model: ingredientModel,
        as: 'ingredients',
        include: [{
          model: ingredientTranslationModel,
          as: 'translations'
        }]
      }, {
        model: ingredientGroupTranslationModel,
        as: 'translations'
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
      include: [{
        model: itemSizeModel, as: 'sizes',
        include: [{
          model: itemSizeTranslationModel,
          as: 'translations'
        }]
      },
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
    utility.nestedUpdateModel(item, oldItem, {
      include: [{
          model: itemTranslationModel,
          as: 'translations',
          updateColumn: 'languageCode',
          addIdColumn: 'itemId',
          idToAdd: 'id',
        }, {
          model: itemSizeModel,
          as: 'sizes',
          updateColumn: 'id',
          addIdColumn: 'itemId',
          idToAdd: 'id',
          include: [{
            model: itemSizeTranslationModel,
            as: 'translations',
            updateColumn: 'languageCode',
            addIdColumn: 'itemSizesId',
            idToAdd: 'id',
          }]
        }, {
        model: ingredientGroupModel,
        as: 'ingredientGroups',
        updateColumn: 'id',
        addIdColumn: 'itemId',
        idToAdd: 'id',
        include: [{
          model: ingredientModel,
          as: 'ingredients',
          updateColumn: 'id',
          addIdColumn: 'ingredientGroupId',
          idToAdd: 'id',
          include: [{
            model: ingredientTranslationModel,
            as: 'translations',
            updateColumn: 'languageCode',
            addIdColumn: 'ingredientId',
            idToAdd: 'id'
          }]
        }, {
          model: ingredientGroupTranslationModel,
          as: 'translations',
          updateColumn: 'languageCode',
          addIdColumn: 'ingredientGroupId',
          idToAdd: 'id'
        }]
      }]
    }).then(function (result) {
      return res.json({success: 1, description: "Item updated"});
    });
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
