module.exports = function(sequelize, DataTypes) {
  return sequelize.define("RestaurantsLanguages", {
    languageCode: {type: DataTypes.STRING(3)},
    name: {type: DataTypes.STRING(3)}
  });
};
