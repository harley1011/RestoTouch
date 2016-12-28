module.exports = function(sequelize, DataTypes) {
	return sequelize.define("ItemSizeTranslations", {
    languageCode: {type: DataTypes.STRING(3), unique: 'sizeTrCompositeIndex', primaryKey: true},
		language: {type: DataTypes.STRING(3)},
		name: {type: DataTypes.STRING},
    sizeId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: 'sizeTrCompositeIndex'
    }
	});
};
