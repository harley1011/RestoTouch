var models = require("../../database/models");
var categoryModel;
var categoryTranslationModel;
var _ = require('lodash');

setDatabase(models);

module.exports = {
  getAllCategories: getAllCategories,
  getCategory: getCategory,
  addCategory: addCategory,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory,
  setDatabase: setDatabase
};

function setDatabase(m) {
  models = m;
  categoryModel = models.getCategoryModel();
  categoryTranslationModel = models.getCategoryTranslationModel();
}

// GET /category
function getAllCategories(req, res) {
  return categoryModel.findAll({
    where: {userId: req.userId},
    include: [{
      model: categoryTranslationModel,
      as: 'translations'
    }]
  }).then(function (categories) {
    return res.json({categories: categories});
  });
}

// GET /category/{id}
function getCategory(req, res) {
  var id = req.swagger.params.id.value;
  return categoryModel.findOne({
    where: {
      id: id,
      userId: req.userId
    },
    include: [{
      model: categoryTranslationModel,
      as: 'translations'
    }]
  }).then(function (category) {
    if (category) {
      return res.json(category);
    } else {
      res.status(204).send();
    }
  });
}

// POST /category
function addCategory(req, res) {
  var newCat = req.body;
  newCat.userId = req.userId;
  return categoryModel.create(newCat, {
    include: [{
      model: categoryTranslationModel,
      as: 'translations'
    }]
  }).then(function (result) {
    return res.json({success: 1, description: "New Category added"});
  });
}

// DELETE /category/{id}
function deleteCategory(req, res) {
  var id = req.swagger.params.id.value;
  return categoryModel.destroy({
    where: {
      id: id,
      userId: req.userId
    }
  }).then(function (result) {
    return res.json({success: 1, description: "Category deleted"});
  });
}

//PUT /category/{id}
function updateCategory(req, res) {
  var category = req.body;
  var id = req.swagger.params.id.value;
  return categoryModel.findOne({
    where: {
      id: id,
      userId: req.userId
    },
    include: [{
      model: categoryTranslationModel,
      as: 'translations'
    }]
  }).then(function (oldCategory) {

    for (var prop in category) {
      if (prop != 'translations')
        oldCategory[prop] = category[prop];
    }

    oldCategory.translations.forEach(function (translation) {
      var newTranslation = _.find(category.translations, function (tr) {
        return tr.languageCode === translation.languageCode
      });
      for (var prop in newTranslation) {
        translation[prop] = newTranslation[prop];
      }
      translation.save();
      _.remove(category.translations, function (tr) {
        return tr.languageCode === translation.languageCode
      });
    });

    category.translations.forEach(function (translation) {
      translation.categoryId = category.id;
    });

    categoryTranslationModel.bulkCreate(category.translations);

    oldCategory.save().then(function (result) {
      return res.json({success: 1, description: 'Category Updated'});
    });
  });
}
