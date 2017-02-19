module.exports = function(sequelize, DataTypes) {
	return sequelize.define("ComboTranslations", {
    languageCode: {type: DataTypes.STRING(3), unique: 'comboTrCompositeIndex', primaryKey: true},
    language: {type: DataTypes.STRING(3)},
	name: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    discountValue: {type: DataTypes.FLOAT},
    discountFlag: {type: DataTypes.CHAR}, // "legend: d=dollar amt discount, p=percentage discount, f=fixed price"
    comboId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: 'comboTrCompositeIndex'
    }
	});
};

