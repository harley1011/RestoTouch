module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Categories", {
    categoryName: {type:DataTypes.STRING}
  });
};
