module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Restaurants", {
    name: {type: DataTypes.STRING, unique: true},
    description: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
    m_open: {type: DataTypes.STRING, allowNull: false},
    m_close: {type: DataTypes.STRING, allowNull: false},
    tu_open: {type: DataTypes.STRING, allowNull: false},
    tu_close: {type: DataTypes.STRING, allowNull: false},
    w_open: {type: DataTypes.STRING, allowNull: false},
    w_close: {type: DataTypes.STRING, allowNull: false},
    th_open: {type: DataTypes.STRING, allowNull: false},
    th_close: {type: DataTypes.STRING, allowNull: false},
    f_open: {type: DataTypes.STRING, allowNull: false},
    f_close: {type: DataTypes.STRING, allowNull: false},
    sa_open: {type: DataTypes.STRING, allowNull: false},
    sa_close: {type: DataTypes.STRING, allowNull: false},
    su_open: {type: DataTypes.STRING, allowNull: false},
    su_close: {type: DataTypes.STRING, allowNull: false}
  });
};
