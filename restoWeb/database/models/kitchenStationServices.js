module.exports = function(sequelize, DataTypes) {
	return sequelize.define("KitchenStationServices", {
    kitchenStationId: {
      type: DataTypes.INTEGER,
      unique: "kitchenServCompositeIndex",
      primaryKey: true
    },
    itemId: {
      type: DataTypes.INTEGER,
      unique: "kitchenServCompositeIndex",
      primaryKey: true
    }
	});
};