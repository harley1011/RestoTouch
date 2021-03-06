var models = require("../../database/models");
var menuModel;
var categoryModel;
var menuCategoryModel;
var categoryLanguageModel;
var categoryTranslationModel;
var menuTranslationsModel;
var itemModel;
var itemTranslationModel;
var itemSizeModel;
var itemSizesTranslationsModel;
var ingredientGroupModel;
var ingredientModel;
var ingredientTranslationModel;
var ingredientGroupTranslationModel;
var itemCategoryModel;
var disabledMenuItemCategoryModel;
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
  itemModel = models.getItemModel();
  itemTranslationModel = models.getItemTranslationModel();
  itemSizeModel = models.getItemSizesModel();
  itemSizesTranslationsModel = models.getItemSizeTranslationsModel();
  ingredientGroupModel = models.getIngredientGroupModel();
  ingredientModel = models.getIngredientModel();
  ingredientGroupTranslationModel = models.getIngredientGroupTranslationModel();
  ingredientTranslationModel = models.getIngredientTranslationModel();
  itemCategoryModel = models.getItemCategoryModel();
  disabledMenuItemCategoryModel = models.getDisabledMenuItemCategoryModel();
}

//GET /menu
function getAllMenu(req, res) {
  return menuModel.findAll({
    where: {userId: req.userId},
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
    var order = 0;
    var menuCategoryAssociations = [];
    menu.categories.forEach(function (category) {
      menuCategoryAssociations.push({menuId: result.id, categoryId: category.id, order: order++});
    })
    menuCategoryModel.bulkCreate(menuCategoryAssociations);

    var menuItemCategoryAssociations = [];
    menu.disabledCategoryItems.forEach(function (itemCategory) {
      menuItemCategoryAssociations.push({menuId: result.id, categoryItemId: itemCategory.id});
    });
    disabledMenuItemCategoryModel.bulkCreate(menuItemCategoryAssociations);

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
      }, {
        model: itemModel,
        as: 'items',
        include: [{
          model: itemTranslationModel,
          as: 'translations'
        }, {
          model: itemSizeModel,//TODO this is where i added it
          as: 'sizes',
          include: [{
            model: itemSizesTranslationsModel,
            as: 'translations'
          }]
        }, {
          model: ingredientGroupModel,
          as: 'ingredientGroups',
          include: [{
            model: ingredientModel,
            as: 'ingredients',
            include: [{
              model: ingredientTranslationModel,
              as: 'translations'
            }]
          }, {
            model: ingredientGroupTranslationModel,
            as: 'translations'
          }]
        }]
      }]
    }, {
      model: itemCategoryModel,
      as: 'disabledCategoryItems'
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
    }, {
      model: itemCategoryModel,
      as: 'disabledCategoryItems'
    }]
  }).then(function (oldMenu) {

    var categoriesToAdd = _.differenceBy(menu.categories, oldMenu.categories, 'id');
    var categoriesToUpdate = _.intersectionBy(menu.categories, oldMenu.categories, 'id');
    var categoriesToRemove = _.differenceBy(oldMenu.categories, menu.categories, 'id');
    var itemCategoriesToAdd = _.differenceBy(menu.disabledCategoryItems, oldMenu.disabledCategoryItems, 'id');
    var itemCategoriesToRemove = _.differenceBy(oldMenu.disabledCategoryItems, menu.disabledCategoryItems, 'id');

    var order = 0;
    var category = null;
    var menuCategoryAssociations = [];
    for (var i = 0; i < menu.categories.length; i++) {
      category = menu.categories[i];

      if (categoriesToAdd.indexOf(category) !== -1) {
        menuCategoryAssociations.push({menuId: oldMenu.id, categoryId: category.id, order: order++});
      } else if (categoriesToUpdate.indexOf(category) !== -1) {
        menuCategoryModel.update({order: order++}, {where: {menuId: oldMenu.id, categoryId: category.id}});
      }
    }
    menuCategoryModel.bulkCreate(menuCategoryAssociations);

    categoriesToRemove.forEach(function (category) {
      menuCategoryModel.destroy({where: {menuId: oldMenu.id, categoryId: category.id}});
    })

    var menuItemCategoryAssociations = [];
    itemCategoriesToAdd.forEach(function (itemCategory) {
      menuItemCategoryAssociations.push({menuId: oldMenu.id, categoryItemId: itemCategory.id});
    });
    disabledMenuItemCategoryModel.bulkCreate(menuItemCategoryAssociations);

    itemCategoriesToRemove.forEach(function (itemCategory) {
      disabledMenuItemCategoryModel.destroy({where: {menuId: oldMenu.id, categoryItemId: itemCategory.id}});
    });

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
      return res.json({success: 1, description: 'Menu Updated'});
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
