module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Ingredient", {
    addByDefault: {type: DataTypes.BOOLEAN, default: true},
    price: {type: DataTypes.DOUBLE},
    allowQuantity: DataTypes.INTEGER
  });
};
