module.exports = (sequelize, DataTypes) => {
  const FoodItem = sequelize.define(
    'foodItem',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      storeId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      quantity: DataTypes.INTEGER,
      price: DataTypes.DECIMAL(10, 2),
      availableUntil: DataTypes.DATE,
      imageUrl: DataTypes.STRING,
    },
    {
      tableName: 'foodItems',
      timestamps: true,
      underscored: true,
    }
  );

  FoodItem.associate = (models) => {
    FoodItem.belongsTo(models.Store, {
      foreignKey: 'id',
      as: 'store',
    });
  };

  return FoodItem;
};
