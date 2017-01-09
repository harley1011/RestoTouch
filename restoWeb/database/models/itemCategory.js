module.exports = function(sequelize, DataTypes) {
  return sequelize.define("ItemCategory", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });
};
