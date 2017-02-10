module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Users", {
    firstName: {type: DataTypes.STRING, allowNull: false},
    lastName: DataTypes.STRING,
    email: {type: DataTypes.STRING, unique: true},
    phoneNumber: {type: DataTypes.STRING, unique: false},
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    emailVerified: {type: DataTypes.BOOLEAN, defaultValue: false},
    isEmployee: {type: DataTypes.BOOLEAN, defaultValue: false},
    employeePassword: DataTypes.STRING,
    employeeSalt: DataTypes.STRING,
  });
};
