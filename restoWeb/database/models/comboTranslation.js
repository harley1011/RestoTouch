module.exports = function(sequelize, DataTypes) {
	return sequelize.define("ComboTranslations", {
    languageCode: {type: DataTypes.STRING(3), unique: 'categoryTrCompositeIndex', primaryKey: true},
		language: {type: DataTypes.STRING(3)},
		name: {type: DataTypes.STRING},
        description: {type: DataTypes.STRING},
    comboId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: 'comboTrCompositeIndex'
    }
	});
};

