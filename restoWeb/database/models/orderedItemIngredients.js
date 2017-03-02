module.exports = function(sequelize, DataTypes) {
  return sequelize.define("OrderedItemIngredient", {
    price: {type: DataTypes.DOUBLE, allowNull: false}
  });
};
