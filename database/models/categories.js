module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Categories", {
    catId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    categoryName: DataTypes.STRING,
    }
  });
};
