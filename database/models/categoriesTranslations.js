module.exports = function(sequelize, DataTypes) {
	return sequelize.define("CategoriesTranslations", {
    languageCode: {type: DataTypes.STRING(3), unique: 'categoryTrCompositeIndex', primaryKey: true},
		language: {type: DataTypes.STRING(3)},
		name: {type: DataTypes.STRING},
    categoryId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: 'categoryTrCompositeIndex'
    }
	});
};