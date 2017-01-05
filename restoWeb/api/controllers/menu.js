var models = require("../../database/models");
var menuModel;
var categoryModel;
var menuCategoryModel;
var categoryLanguageModel;
var categoryTranslationModel;
var menuTranslationsModel;
var _ = require('lodash');


setDatabase(models);

module.exports = {
  getAllMenu: getAllMenu,
  saveMenu: saveMenu,
  getMenu: getMenu,
  updateMenu: updateMenu,
  delMenu: delMenu,
  setDatabase: setDatabase
};

function setDatabase(m) {
  models = m;
  menuModel = models.getMenuModel();
  categoryModel = models.getCategoryModel();
  menuTranslationsModel = models.getMenuTranslationsModel();
  menuCategoryModel = models.getMenuCategoryModel();
  categoryTranslationModel = models.getCategoryTranslationModel();
}

//GET /menu
function getAllMenu(req, res) {
  return menuModel.findAll({
    where: {userId: req.userId},
    include: [{
      model: menuTranslationsModel,
      as: 'translations'
    }]
  }).then(function (menus) {
    return res.json({menus: menus});
  });
}

//POST /menu
function saveMenu(req, res) {
  var menu = req.body;
  menu.userId = req.userId;

  return menuModel.create(menu, {
    include: [{
      model: menuTranslationsModel,
      as: 'translations'
    }]
  }).then(function (result) {
    var menuCategoryAssociations = [];
    menu.categories.forEach(function (category) {
      menuCategoryAssociations.push({menuId: result.id, categoryId: category.id});
    })
    menuCategoryModel.bulkCreate(menuCategoryAssociations);
    return res.json({success: 1, description: "Menu Added"});
  });
}

//GET /menu/{menuId}
function getMenu(req, res) {
  var id = req.swagger.params.menuId.value;
  return menuModel.findOne({
    where: {
      id: id,
      userId: req.userId
    },
    include: [{
      model: menuTranslationsModel,
      as: 'translations'
    }, {
      model: categoryModel,
      as: 'categories',
      include: [{
        model: categoryTranslationModel,
        as: 'translations'
      }]
    }]
  }).then(function (menu) {
    if (menu) {
      res.json(menu);
    } else {
      res.status(204).send();
    }
  });
}

//PUT /menu/{menuId}
function updateMenu(req, res) {
  var menu = req.body;
  var id = req.swagger.params.menuId.value;
  return menuModel.findOne({
    where: {
      id: id,
      userId: req.userId
    },
    include: [{
      model: menuTranslationsModel,
      as: 'translations'
    }, {
      model: categoryModel,
      as: 'categories'
    }]
  }).then(function (oldMenu) {

    var categoriesToAdd = _.differenceBy(menu.categories, oldMenu.categories, 'id');
    var categoriesToRemove = _.differenceBy(oldMenu.categories, menu.categories, 'id');

    var menuCategoryAssociations = [];
    categoriesToAdd.forEach(function (category) {
      menuCategoryAssociations.push({menuId: oldMenu.id, categoryId: category.id});
    })

    menuCategoryModel.bulkCreate(menuCategoryAssociations);

    categoriesToRemove.forEach(function (category) {
      menuCategoryModel.destroy({where: {menuId: oldMenu.id, categoryId: category.id}});
    })

    for (var prop in menu) {
      if (prop != 'translations')
        oldMenu[prop] = menu[prop];
    }

    oldMenu.translations.forEach(function (translation) {
      var newTranslation = _.find(menu.translations, function (tr) {
        return tr.languageCode === translation.languageCode
      });
      for (var prop in newTranslation) {
        translation[prop] = newTranslation[prop];
      }
      translation.save();
      _.remove(menu.translations, function (tr) {
        return tr.languageCode === translation.languageCode
      });
    });

    menu.translations.forEach(function (translation) {
      translation.menuId = menu.id;
    });
    // Create the new translations
    menuTranslationsModel.bulkCreate(menu.translations);

    oldMenu.save().then(function (result) {
      menuLanguageModel.bulkCreate(languagesToAdd).then(function (result) {
        return res.json({success: 1, description: 'Menu Updated'});
      })
    });
  });
}

//DELETE /menu/{menuId}
function delMenu(req, res) {
  var id = req.swagger.params.menuId.value;
  return menuModel.destroy({
    where: {
      id: id,
      userId: req.userId
    }
  }).then(function (result) {
    return res.json({success: 1, description: "Menu Deleted"});
  });
}
