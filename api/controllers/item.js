var models = require("../../database/models");
var itemModel;
var itemSizeModel;
var itemLanguageModel;

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
  itemLanguageModel = models.getItemLanguageModel();
}


function getAll(req, res) {
  return itemModel.findAll({
    where: {userId: req.userId},
    include: [{model: itemSizeModel, as: 'sizes'}],
    order: ['name']
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

  return itemModel.create(item, {
    include: [{
      model: itemSizeModel,
      as: 'sizes'
    }, {
      model: itemLanguageModel,
      as: 'supportedLanguages'
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
      model: itemLanguageModel,
      as: 'supportedLanguages'
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

  return itemModel.findOne({
    where: {id: item.id},
    include: [{model: itemSizeModel, as: 'sizes'},
              {model: itemLanguageModel, as: 'supportedLanguages'}]
  }).then(function (oldItem) {

    var sizesToRemove = _.differenceBy(oldItem.sizes, item.sizes, 'id');
    var sizesToAdd = _.differenceBy(item.sizes, oldItem.sizes, 'id');
    var languagesToRemove = _.differenceBy(oldItem.supportedLanguages, item.supportedLanguages, 'languageCode');
    var languagesToAdd = _.differenceBy(item.supportedLanguages, oldItem.supportedLanguages, 'languageCode');

    for (var prop in item) {
      oldItem[prop] = item[prop];
    }
    sizesToAdd.forEach(function (size) {
      size.itemId = oldItem.id;
    })
    itemSizeModel.bulkCreate(sizesToAdd);

    sizesToRemove.forEach(function (size) {
      itemSizeModel.destroy({where: {id: size.id}})
    })

    oldItem.save().then(function (result) {
      languagesToRemove.forEach(function (language) {
        itemLanguageModel.destroy({where: {'languageCode': language.languageCode, 'itemId': item.id}});
      })

      languagesToAdd.forEach(function (language) {
        language.itemId = item.id;
      })

      itemLanguageModel.bulkCreate(languagesToAdd).then(function (result) {
        return res.json({success: 1, description: "Item updated"});
      })
    })

  });
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
