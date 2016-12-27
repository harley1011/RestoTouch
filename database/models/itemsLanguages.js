module.exports = function(sequelize, DataTypes) {
  return sequelize.define("ItemsLanguages", {
    languageCode: {type: DataTypes.STRING(3), unique: 'itemTrCompositeIndex', primaryKey: true},
    name: {type: DataTypes.STRING(255)},
    itemId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: 'itemTrCompositeIndex'
    }
  });
};
