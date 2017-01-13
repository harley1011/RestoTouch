module.exports = function(sequelize, DataTypes) {
	return sequelize.define("MenuTranslations", {
    languageCode: {type: DataTypes.STRING(3), unique: 'menuTrCompositeIndex', primaryKey: true},
		language: {type: DataTypes.STRING(3)},
		name: {type: DataTypes.STRING},
    menuId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: 'menuTrCompositeIndex'
    }
	});
};

