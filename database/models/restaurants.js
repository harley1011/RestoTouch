module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Restaurants", {
    address: {type: DataTypes.STRING, allowNull: false},
    mOpen: {type: DataTypes.STRING, allowNull: false},
    mClose: {type: DataTypes.STRING, allowNull: false},
    tuOpen: {type: DataTypes.STRING, allowNull: false},
    tuClose: {type: DataTypes.STRING, allowNull: false},
    wOpen: {type: DataTypes.STRING, allowNull: false},
    wClose: {type: DataTypes.STRING, allowNull: false},
    thOpen: {type: DataTypes.STRING, allowNull: false},
    thClose: {type: DataTypes.STRING, allowNull: false},
    fOpen: {type: DataTypes.STRING, allowNull: false},
    fClose: {type: DataTypes.STRING, allowNull: false},
    saOpen: {type: DataTypes.STRING, allowNull: false},
    saClose: {type: DataTypes.STRING, allowNull: false},
    suOpen: {type: DataTypes.STRING, allowNull: false},
    suClose: {type: DataTypes.STRING, allowNull: false}
  });
};
