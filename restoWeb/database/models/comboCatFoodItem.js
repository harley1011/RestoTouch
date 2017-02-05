module.exports = function(sequelize, DataTypes) {
	return sequelize.define("ComboCatFoodItem", {
    comboId: {
      type: DataTypes.INTEGER,
      unique: 'comboCFICompositeIndex'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: 'comboCFICompositeIndex'
    },
    itemSizesId: {
      type: DataTypes.INTEGER,
      unique: 'comboCFICompositeIndex'
    }
	});
};