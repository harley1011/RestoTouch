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

//POST /restaurantMenu
function saveRestaurantMenu(req, res) {
  var restaurantMenu = req.body;
  return restaurantMenuModel.create(restaurantMenu).then(function(result) {
    return res.json({success: 1, description: "Restaurant Menu Relation Added"});
  });
}

//DELETE /restaurantMenu/{restaurantId}{menuId}
function delRestaurantMenu(req, res) {
  var restaurantId = req.swagger.params.restaurantId.value;
  var menuId = req.swagger.params.menuId.value;
  return restaurantMenuModel.destroy({
    where: {
      restaurantId: restaurantId,
      menuId: menuId
    }
  }).then(function(result) {
    return res.json({success: 1, description: "Restaurant Menu Relation Deleted"});
  });
}
