module.exports = function(sequelize, DataTypes) {
	return sequelize.define("RestaurantsTranslations", {
		language: {DataTypes.STRING(3)},
		name: {DataTypes.STRING},
		description: {DataTypes.STRING}
	});
}
