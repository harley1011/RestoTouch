module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Categories", {
    categoryName: DataTypes.STRING,
    }
  });
};
