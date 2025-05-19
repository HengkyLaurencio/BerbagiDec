module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('transaction', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: DataTypes.INTEGER,
    foodItemId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
      defaultValue: 'pending',
    },
    pickupTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, { foreignKey: 'id' });
    Transaction.belongsTo(models.FoodItem, { foreignKey: 'id' });
  };

  return Transaction;
};
