module.exports = function(sequelize, DataTypes) {
  return sequelize.define("MenusLanguages", {
    languageCode: {type: DataTypes.STRING(3), unique: 'menuTrCompositeIndex', primaryKey: true},
    name: {type: DataTypes.STRING(255)},
    menuId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: 'menuTrCompositeIndex'
    }
  });
};
