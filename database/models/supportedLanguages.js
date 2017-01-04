module.exports = function(sequelize, DataTypes) {
	return sequelize.define("SupportedLanguages", {
    languageCode: {type: DataTypes.STRING(3), unique: 'supportedLanguageCompositeIndex', primaryKey: true},
		name: {type: DataTypes.STRING},
    userId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: 'supportedLanguageCompositeIndex'
    }
	});
};

