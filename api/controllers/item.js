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

//PUT /item/{id}
function update(req, res) {
   var item = req.body;

  return itemModel.findOne({
    where: {id: item.id},
    include: [{model: itemSizeModel, as: 'sizes'}]
  }).then(function (oldItem) {
      for (var prop in item) {
        oldItem[prop] = item[prop];
      }

    // var sizesToRemove = _.differenceBy(oldRestaurant.supportedLanguages, restaurant.supportedLanguages, 'languageCode');

      oldItem.save().then(function (result) {
        return res.json({success: 1, description: "Item updated"});
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
