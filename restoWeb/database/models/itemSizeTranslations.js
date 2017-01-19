module.exports = function(sequelize, DataTypes) {
  return sequelize.define("ItemSizesTranslations", {
    languageCode: {type: DataTypes.STRING(3), unique: 'itemSizesTrCompositeIndex', primaryKey: true},
    name: {type: DataTypes.STRING},
    itemSizesId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: 'itemSizesTrCompositeIndex'
    }
  });
};
