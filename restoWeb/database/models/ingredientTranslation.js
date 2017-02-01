module.exports = function(sequelize, DataTypes) {
  return sequelize.define("IngredientTranslations", {
    languageCode: {type: DataTypes.STRING(3), unique: 'ingredientTrCompositeIndex', primaryKey: true},
    name: {type: DataTypes.STRING},
    ingredientId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: 'ingredientTrCompositeIndex'
    }
  });
};
