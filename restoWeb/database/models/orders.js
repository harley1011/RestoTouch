module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Orders", {
    total: {type: DataTypes.DOUBLE, allowNull: false}
  });
};
