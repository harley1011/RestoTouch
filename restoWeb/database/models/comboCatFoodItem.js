module.exports = function(sequelize, DataTypes) {
	return sequelize.define("ComboCatFoodItem", {
    comboId: {
      type: DataTypes.INTEGER,
      unique: "comboCatItemCompositeIndex",
      primaryKey: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      unique: "comboCatItemCompositeIndex",
      primaryKey: true
    },
    itemId: {
      type: DataTypes.INTEGER,
      unique: "comboCatItemCompositeIndex",
      primaryKey: true
    },
    itemSizesId: {
      type: DataTypes.INTEGER,
      unique: "comboCatItemCompositeIndex",
      primaryKey: true
    }
	});
};