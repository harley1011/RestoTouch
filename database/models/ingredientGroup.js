module.exports = function(sequelize, DataTypes) {
  return sequelize.define("IngredientGroup", {
    name: DataTypes.TEXT,
    numberOfIngredientsAllowed: DataTypes.INTEGER
  });
};
