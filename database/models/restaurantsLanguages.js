module.exports = function(sequelize, DataTypes) {
  return sequelize.define("RestaurantsLanguages", {
    code: {type: DataTypes.STRING(3), unique: 'restaurantTrCompositeIndex'},
    name: {type: DataTypes.STRING(255)},
    restaurantId: {
      type: DataTypes.INTEGER,
      unique: 'restaurantTrCompositeIndex'
    }
  });
};
