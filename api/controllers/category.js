var models = require("../../database/models");
var categoryModel;

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
}

// GET /category
function getAllCategories(req, res) {
  return categoryModel.findAll().then(function(categories) {
    return res.json({ categories: categories });
  });
}

// GET /category/{name}
function getCategory(req, res) {
}

// POST /category/{name}
function addCategory(req, res) {
}

// PUT /category/{name}
function updateCategory(req, res) {
}

// DELETE /category/{name}
function deleteCategory(req, res) {
}
