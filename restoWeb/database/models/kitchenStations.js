module.exports = function(sequelize, DataTypes) {
  return sequelize.define("KitchenStations", {
    name: {type: DataTypes.STRING}
  });
};