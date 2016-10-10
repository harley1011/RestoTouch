module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Categories", {
    catId: {type: DataTypes.INTEGER, unique: true},
    categoryName: DataTypes.STRING,
  });
};
