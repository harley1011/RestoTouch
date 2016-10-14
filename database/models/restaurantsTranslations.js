module.exports = function(sequelize, DataTypes) {
	return sequelize.define("RestaurantsTranslations", {
		language: {type: DataTypes.STRING(3)},
		name: {type: DataTypes.STRING},
		description: {type: DataTypes.STRING}
	});
};

