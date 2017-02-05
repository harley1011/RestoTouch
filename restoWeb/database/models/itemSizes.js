module.exports = function(sequelize, DataTypes) {
  return sequelize.define("ItemSizes", {
    price: {type: DataTypes.DOUBLE, allowNull: false}
  });
};
