module.exports = function(sequelize, DataTypes) {
  return sequelize.define("RestaurantsLanguages", {
    code: {type: DataTypes.STRING(3), unique: 'restaurantTrCompositeIndex', primaryKey: true},
    name: {type: DataTypes.STRING(255)},
    restaurantId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: 'restaurantTrCompositeIndex'
    }
  });
};
