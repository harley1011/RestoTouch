module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Menus", {
    name: {type: DataTypes.STRING}
  });
};
