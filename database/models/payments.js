module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Payments", {
    name: {type: DataTypes.ENUM('cash', 'debit', 'credit')},
    used: {type: DataTypes.BOOLEAN, defaultValue: false}
  });
};
