module.exports = function(sequelize, DataTypes) {
  return sequelize.define("RestaurantsLanguages", {
    code: {type: DataTypes.STRING(3)},
    name: {type: DataTypes.STRING(255)}
  });
};
