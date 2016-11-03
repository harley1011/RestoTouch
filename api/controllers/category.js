var models = require("../../database/models");
var categoryModel;
var categoryLanguagesModel;
var categoryTranslationsModel;

setDatabase(models);

module.exports = {
  getAllCategories: getAllCategories,
  getCategory: getCategory,
  addCategory: addCategory,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory,
  setDatabase: setDatabase
};

function setDatabase (m) {
  models = m;
  categoryModel = models.getCategoryModel();
  categoryTranslationsModel = models.getCategoriesTranslationsModel();
  categoryLanguagesModel = models.getCategoriesLanguagesModel();
}

// GET /category
function getAllCategories(req, res) {
  return categoryModel.findAll({where: {userId: req.userId}}).then(function(categories) {
    return res.json({ categories: categories });
  });
}

// GET /category/{name}
function getCategory(req, res) {
}

// POST /category/{name}
function addCategory(req, res) {
  var newCat = req.body;
  newCat.userId = req.userId;
  return categoryModel.create(newCat, {
    include: [{
      model: categoryLanguagesModel,
      as: 'supportedLanguages'
    },{model: categoryTranslationsModel, as: 'translations'}]
  }).then(function(result) {
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
  }).then(function(result) {
    return res.json({success: 1, description: "Category deleted"});
  });
}

//PUT /category/{id}
function updateCategory(req, res) {
  var category = req.body;
  var id = req.swagger.params.id.value;
  return categoryModel.update(category, {
    where: {
      id: id,
      userId: req.userId
    }
  }).then(function(result) {
    return res.json({success: 1, description: "Category updated"});
  });
}
