module.exports = function(sequelize, DataTypes) {
	return sequelize.define("ComboCatFoodItem", {
    comboId: {
      type: DataTypes.INTEGER,
      unique: "comboItemCompositeIndex",
      primaryKey: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    itemId: {
      type: DataTypes.INTEGER,
      unique: "comboItemCompositeIndex",
      primaryKey: true
    }
	});
};