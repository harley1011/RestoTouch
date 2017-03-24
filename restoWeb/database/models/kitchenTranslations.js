module.exports = function(sequelize, DataTypes) {
	return sequelize.define("KitchenTranslations", {
    languageCode: {type: DataTypes.STRING(3), unique: 'kitchenTrCompositeIndex', primaryKey: true},
	name: {type: DataTypes.STRING},
    kitchenStationId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: 'kitchenTrCompositeIndex'
    }
	});
};