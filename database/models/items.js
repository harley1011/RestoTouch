module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Items", {
    imageUrl: DataTypes.TEXT
  });
};
