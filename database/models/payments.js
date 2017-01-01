module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Payments", {
    name: {type: DataTypes.ENUM('Cash', 'Debit', 'Credit')},
    used: {type: DataTypes.BOOLEAN, defaultValue: false}
  });
};
