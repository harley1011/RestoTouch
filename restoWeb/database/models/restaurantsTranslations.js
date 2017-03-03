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
    },
    kitCashModeFlag: {type: DataTypes.STRING} // Legend : kco-> Kitchen & Cashier Mode Post,
                                              //          kce-> Kitchen & cashier mode Pre ,
                                              //          cnk-> Cashier mode only no kitchen
	});
};

