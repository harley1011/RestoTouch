module.exports = function(sequelize, DataTypes) {
  return sequelize.define("IngredientGroupTranslations", {
    languageCode: {type: DataTypes.STRING(3), unique: 'ingredientGroupTrCompositeIndex', primaryKey: true},
    name: {type: DataTypes.STRING},
    ingredientGroupId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: 'ingredientGroupTrCompositeIndex'
    }
  });
};
