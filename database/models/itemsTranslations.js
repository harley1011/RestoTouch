module.exports = function(sequelize, DataTypes) {
	return sequelize.define("ItemsTranslations", {
    languageCode: {type: DataTypes.STRING(3), unique: 'itemTrCompositeIndex', primaryKey: true},
		language: {type: DataTypes.STRING(3)},
		name: {type: DataTypes.STRING},
		description: {type: DataTypes.STRING},
    itemId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: 'itemTrCompositeIndex'
    }
	});
};
