module.exports = function(sequelize, DataTypes) {
  return sequelize.define("OrderedItemIngredient", {
    quantity: {type: DataTypes.INTEGER}
  });
};
