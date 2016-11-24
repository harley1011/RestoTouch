var models = require("../../database/models");
var menuCategoryModel;
setDatabase(models);


module.exports = {
  setDatabase: setDatabase,
  saveMenuCategory: saveMenuCategory,
  delMenuCategory: delMenuCategory

};

function setDatabase (m) {
  models = m;
  menuCategoryModel = models.getMenuCategoryModel();
}

//POST /menuCategory
function saveMenuCategory(req, res) {

  var menuCategory = req.body;
  return menuCategoryModel.create(menuCategory).then(function(result){
    return res.json({success: 1, description: "Added Category to Menu"});
  });

}

//DELETE /menuCategory/{menuId}{categoryId}
function delMenuCategory(req, res) {
  var menuId = req.swagger.params.menuId.value;
  var categoryId = req.swagger.params.categoryId.value;

 return menuCategoryModel.destroy({
   where: {
     menuId: menuId,
     categoryId: categoryId
   }
 }).then(function (result) {
 return res.json({success: 1, description: "Deleted Category from Menu"});
 });

}
