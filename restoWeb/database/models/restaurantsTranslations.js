module.exports = function(sequelize, DataTypes) {
	return sequelize.define("RestaurantsTranslations", {
    languageCode: {type: DataTypes.STRING(3), unique: 'restaurantTrCompositeIndex', primaryKey: true},
		language: {type: DataTypes.STRING(3)},
		name: {type: DataTypes.STRING},
		description: {type: DataTypes.STRING},
    restaurantId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: 'restaurantTrCompositeIndex'
    }
	});
};

