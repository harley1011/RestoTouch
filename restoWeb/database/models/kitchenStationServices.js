module.exports = function(sequelize, DataTypes) {
	return sequelize.define("KitchenStationServices", {
    kitchenStationId: {
      type: DataTypes.INTEGER,
      unique: "kitchenServCompositeIndex",
      primaryKey: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      unique: "kitchenServCompositeIndex",
      primaryKey: true
    }
	});
};