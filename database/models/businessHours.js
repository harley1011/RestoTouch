module.exports = function(sequelize, DataTypes) {
  return sequelize.define("BusinessHours", {
    day: {type: DataTypes.INTEGER, allowNull: false},
    shift: {type: DataTypes.INTEGER, allowNull: false},
    openTime: {type: DataTypes.STRING, allowNull: false},
    closeTime: {type: DataTypes.STRING, allowNull: false},
    active: {type: DataTypes.BOOLEAN, defaultValue: false}
  });
};
