module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Ingredient", {
    name: {type: DataTypes.STRING(255)},
    addByDefault: {type: DataTypes.BOOLEAN, default: true},
    price: {type: DataTypes.DOUBLE}
  });
};
