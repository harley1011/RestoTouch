module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Orders", {
    price: {type: DataTypes.DOUBLE, allowNull: false}
  });
};
