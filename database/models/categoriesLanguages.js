module.exports = function(sequelize, DataTypes) {
  return sequelize.define("CategoriesLanguages", {
    languageCode: {type: DataTypes.STRING(3), unique: 'categoryTrCompositeIndex', primaryKey: true},
    name: {type: DataTypes.STRING(255)},
    categoryId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: 'categoryTrCompositeIndex'
    }
  });
};
