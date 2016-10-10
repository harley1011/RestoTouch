var models = require("../../database/models");
var menuModel;
setDatabase(models);

module.exports = {
  getAllMenu: getAllMenu,
  saveMenu: saveMenu,
  getMenu: getMenu,
  updateMenu: updateMenu,
  delMenu: delMenu,
  setDatabase: setDatabase
};

function setDatabase (m) {
  models = m;
  menuModel = models.getMenuModel();
}

//GET /menu
function getAllMenu(req, res) {
  return menuModel.findAll({where: {userId: req.userId}}).then(function(menus) {
    return res.json({ menus: menus });
  });
}

//POST /menu
function saveMenu(req, res) {
  var menu = req.body;
  menu.userId = req.userId;
  return menuModel.create(menu).then(function(result) {
    return res.json({success: 1, description: "Menu Added"});
  });
}

//GET /menu/{name}
function getMenu(req, res) {
  var name = req.swagger.params.name.value;
  return menuModel.findOne({
    where: {
      name: name,
      userId: req.userId
    }
  }).then(function(menu) {
    if (menu) {
      res.json(menu);
    } else {
      res.status(204).send();
    }
  });
}

//PUT /menu/{name}
function updateMenu(req, res) {
  var menu = req.body;
  var name = req.swagger.params.name.value;
  return menuModel.update(menu, {
    where: {
      name: name,
      userId: req.userId
    }
  }).then(function(result) {
    return res.json({success: 1, description: "Menu Updated"});
  });
}

//DELETE /menu/{name}
function delMenu(req, res) {
  var name = req.swagger.params.name.value;
  return menuModel.destroy({
    where: {
      name: name,
      userId: req.userId
    }
  }).then(function(result) {
    return res.json({success: 1, description: "Menu Deleted"});
  });
}
