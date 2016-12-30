var models = require("../../database/models");
var menuModel;
var categoryModel;
var menuLanguageModel;
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

function setDatabase (m) {
  models = m;
  menuModel = models.getMenuModel();
  categoryModel = models.getCategoryModel(); // TODO check why this causing error
  menuLanguageModel = models.getMenuLanguageModel();
  menuTranslationsModel = models.getMenuTranslationsModel();
}

//GET /menu
function getAllMenu(req, res) {
  return menuModel.findAll({
    where: {userId: req.userId},
    include: [{
      model: menuTranslationsModel,
      as: 'translations'
    }]
}).then(function(menus) {
    return res.json({ menus: menus });
  });
}

//POST /menu
function saveMenu(req, res) {
  var menu = req.body;
  menu.userId = req.userId;
  return menuModel.create(menu, {
    include: [{
      model: menuLanguageModel,
      as: 'supportedLanguages'
    }, {
      model: menuTranslationsModel,
      as: 'translations'
    }]
  }).then(function(result) {
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
      model: menuLanguageModel,
      as: 'supportedLanguages'
    }, {
      model: menuTranslationsModel,
      as: 'translations'
    }, {
      model: categoryModel
    }]
  }).then(function(menu) {
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
      model: menuLanguageModel,
      as: 'supportedLanguages'
    }, {
      model: menuTranslationsModel,
      as: 'translations'
    }],
    include: [{
      model: categoryModel,
      as: 'categories'
    }]
  }).then(function (oldMenu) {

    var languagesToRemove = _.differenceBy(oldMenu.supportedLanguages, menu.supportedLanguages, 'languageCode');
    var languagesToAdd = _.differenceBy(menu.supportedLanguages, oldMenu.supportedLanguages, 'languageCode');

    for (var prop in menu) {
      if(prop != 'translations')
          oldMenu[prop] = menu[prop];
    }

    oldMenu.translations.forEach(function(translation) {
      var newTranslation = _.find(menu.translations, function (tr) {return tr.languageCode === translation.languageCode});
      for (var prop in newTranslation) {
          translation[prop] = newTranslation[prop];
      }
      translation.save();
      _.remove(menu.translations, function (tr) {return tr.languageCode === translation.languageCode});
    });

    menu.translations.forEach(function (translation) {
      translation.menuId = menu.id;
    });
    // Create the new translations
    menuTranslationsModel.bulkCreate(menu.translations);

    oldMenu.save().then(function (result) {
      languagesToRemove.forEach(function (language) {
        menuLanguageModel.destroy({where: {'languageCode': language.languageCode, 'menuId': menu.id}});
        menuTranslationsModel.destroy({where: {'languageCode': language.languageCode, 'menuId': menu.id}});
        _.remove(oldMenu.translations, function (translation) { return translation.languageCode == language.languageCode});
      })

      languagesToAdd.forEach(function (language) {
        language.menuId = menu.id;
      })

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
  }).then(function(result) {
    return res.json({success: 1, description: "Menu Deleted"});
  });
}
