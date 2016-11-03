module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Items", {
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.STRING, allowNull: false}

  });
};
