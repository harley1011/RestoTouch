module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Restaurants", {
    address: {type: DataTypes.STRING, allowNull: false},
    paypalId: {type: DataTypes.STRING, allowNull: true},
    kitCashModeFlag: {type: DataTypes.STRING}, // Legend : kco-> Kitchen & Cashier Mode Post
                                               //          kce-> Kitchen & cashier mode Pre
                                               //          cnk-> Cashier mode only no kitchen
    orderNotiFlag: {type: DataTypes.STRING}, // Legend : nu-> by number
                                              //          na-> by name
                                              //          ta-> by table
  });
};
