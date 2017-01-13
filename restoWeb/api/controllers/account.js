var models = require("../../database/models");
var passwordHasher = require("../helpers/passwordHash");
var jwt = require('jwt-simple');
var _ = require('lodash');
var configAuth = require('../../config/auth');
var supportedLanguageModel;
var userModel;

setDatabase(models);

module.exports = {
  register: register,
  login: login,
  setDatabase: setDatabase,
  getAccountSettings: getAccountSettings,
  saveAccountSettings: saveAccountSettings,
  getSupportedLanguages: getSupportedLanguages,
  saveNewSupportedLanguage: saveNewSupportedLanguage
};

function setDatabase(m) {
  models = m;
  userModel = models.getUserModel();
  supportedLanguageModel = models.getSupportedLanguageModel();
}

function register(req, res) {
  var user = req.body;
  var passwordData = passwordHasher.saltHashPassword(user.password);
  user.password = passwordData.passwordHash;
  user.salt = passwordData.salt;
  user.supportedLanguages = [{name: "English", languageCode: "en"}];
  return userModel.create(user, {
    include: [{
      model: supportedLanguageModel,
      as: 'supportedLanguages'
    }]
  }).then(function (newUser) {

    var info = userInfo(newUser.dataValues);
    return res.json({success: 1, description: "User registered", "user": info.user, "accessToken": info.token});
  });
}

function userInfo(user) {
  var token = genToken(user);
  return {
    user: {
      "id": user.id,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "email": user.email
    },
    "token": token.token
  }
}

function getAccountSettings(req, res) {
  //will eventually have more than just supported language model to return
  return supportedLanguageModel.findAll({where: {userId: req.userId}}).then(function (supportedLanguages) {
    return res.json({success: 1, 'supportedLanguages': supportedLanguages});
  })
}

function saveNewSupportedLanguage(req, res) {
  var supportedLanguage = req.body;
  supportedLanguage.userId = req.userId;
  return supportedLanguageModel.create(supportedLanguage).then(function () {
    return res.json({success: 1, description: "Language added"});

  })
}

function getSupportedLanguages(req, res) {
  return supportedLanguageModel.findAll({where: {userId: req.userId}, order: "name"}).then(function (supportedLanguages) {
    return res.json(supportedLanguages);
  })
}

function saveAccountSettings(req, res) {
  var accountSettings = req.body;
  return supportedLanguageModel.findAll({where: {userId: req.userId}}).then(function (supportedLanguages) {

    var languagesToRemove = _.differenceBy(supportedLanguages, accountSettings.supportedLanguages, 'languageCode');
    var newLanguagesToAdd = _.differenceBy(accountSettings.supportedLanguages, supportedLanguages, 'languageCode');

    languagesToRemove.forEach(function (language) {
      supportedLanguageModel.destroy({where: {'languageCode': language.languageCode, 'userId': req.userId}});
      //todo remove all the users translations using this language
    });

    newLanguagesToAdd.forEach(function (language) {
      language.userId = req.userId;
    })
    supportedLanguageModel.bulkCreate(newLanguagesToAdd).then(function (result) {
      return res.json({success: 1, description: "Account Settings Updated"});
    })
  })

}

function genToken(user) {
  var expires = expiresIn(10000);
  var token = jwt.encode({
    exp: expires,
    email: user.email,
    id: user.id
  }, configAuth.secret);

  return {
    token: token,
    expires: expires,
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

function login(req, res) {
  var user = req.body;

  return userModel.findOne({
    where: {email: user.email}
  }).then(function (newUser) {
    if (!newUser) {
      res.status(401);
      return res.json({message: "User access denied"});
    }
    var info = userInfo(newUser);
    var passwordMatched = passwordHasher.comparePassword(user.password, newUser.salt, newUser.password);
    if (passwordMatched) {
      return res.json({success: 1, description: "User logged in", "user": info.user, "accessToken": info.token});
    } else {
      res.status(401);
      return res.json({message: "User access denied"});
    }

  });
}

