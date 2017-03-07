module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Orders", {
    total: {type: DataTypes.DOUBLE, allowNull: false},
    paidDate: {type: DataTypes.DATE, allowNull: true},
    openedDate: {type: DataTypes.DATE, allowNull: true}
  });
};
