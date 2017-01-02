module.exports = function(sequelize, DataTypes) {
	return sequelize.define("SupportedLanguages", {
    languageCode: {type: DataTypes.STRING(3), unique: 'supportedLanguageCompositeIndex', primaryKey: true},
		language: {type: DataTypes.STRING(3)},
		name: {type: DataTypes.STRING},
    userId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: 'supportedLanguageCompositeIndex'
    }
	});
};

