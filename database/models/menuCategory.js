module.exports = function(sequelize, DataTypes) {
  return sequelize.define( "MenuCategory" , {
    order: {type: DataTypes.INTEGER}
  });
};
