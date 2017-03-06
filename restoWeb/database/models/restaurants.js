module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Restaurants", {
    address: {type: DataTypes.STRING, allowNull: false},
    kitCashModeFlag: {type: DataTypes.STRING} // Legend : kco-> Kitchen & Cashier Mode Post
                                              //          kce-> Kitchen & cashier mode Pre
                                              //          cnk-> Cashier mode only no kitchen
  });
};
