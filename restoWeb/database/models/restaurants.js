module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Restaurants", {
    address: {type: DataTypes.STRING, allowNull: false},
    paypalId: {type: DataTypes.STRING, allowNull: true}
  });
};
