module.exports = function(sequelize, DataTypes) {
  return sequelize.define("OrderedItems", {
    price: {type: DataTypes.DOUBLE, allowNull: false}
  });
};
