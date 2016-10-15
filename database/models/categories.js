module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Categories", {
    catId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    categoryName: DataTypes.STRING,
    restaurantId: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: Restaurants,
        // This is the column name of the referenced model
        key: 'id',
        // This declares when to check the foreign key constraint. PostgreSQL only.
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    }
  });
};
