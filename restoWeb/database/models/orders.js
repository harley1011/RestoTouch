module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Orders", {
    total: {type: DataTypes.DOUBLE, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: true},
    paidDate: {type: DataTypes.DATE, allowNull: true},
    openedDate: {type: DataTypes.DATE, allowNull: true},
    paymentId: {type: DataTypes.STRING, allowNull: true},
    orderId: {type: DataTypes.STRING, allowNull: true}
  });
};
