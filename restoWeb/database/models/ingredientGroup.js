module.exports = function(sequelize, DataTypes) {
  return sequelize.define("IngredientGroup", {
    maxNumberOfIngredients: DataTypes.INTEGER,
    minNumberOfIngredients: DataTypes.INTEGER,
    orderPriority: DataTypes.INTEGER
  });
};
