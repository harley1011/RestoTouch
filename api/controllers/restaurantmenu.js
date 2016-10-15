var models = require("../../database/models");
var restaurantMenuModel;
setDatabase(models);

module.exports = {
  saveRestaurantMenu: saveRestaurantMenu,
  delRestaurantMenu: delRestaurantMenu,
  setDatabase: setDatabase
};

function setDatabase (m) {
  models = m;
  restaurantMenuModel = models.getRestaurantMenuModel();
}

//POST /restaurantmenu
function saveRestaurantMenu(req, res) {
  var restaurantmenu = req.body;
  return restaurantMenuModel.create(restaurantmenu).then(function(result) {
    return res.json({success: 1, description: "Restaurant Menu Relation Added"});
  });
}

//DELETE /restaurantmenu/{restaurantId}{menuId}
function delRestaurantMenu(req, res) {
  var restaurantId = req.swagger.params.restaurantId.value;
  var menuId = req.swagger.params.menuId.value;
  return restaurantMenuModel.destroy({
    where: {
      RestaurantId: restaurantId,
      MenuId: menuId
    }
  }).then(function(result) {
    return res.json({success: 1, description: "Restaurant Menu Relation Deleted"});
  });
}
