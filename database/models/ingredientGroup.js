module.exports = function(sequelize, DataTypes) {
  return sequelize.define("IngredientGroup", {
    name: DataTypes.TEXT,
    maxNumberOfIngredients: DataTypes.INTEGER,
    minNumberOfIngredients: DataTypes.INTEGER,
    orderPriority: DataTypes.INTEGER
  });
};
