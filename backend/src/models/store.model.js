module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define(
    'store',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      storeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      storeDescription: DataTypes.TEXT,
      storeAddress: DataTypes.TEXT,
      latitude: DataTypes.DECIMAL(9, 6),
      longitude: DataTypes.DECIMAL(9, 6),
      openTime: DataTypes.TIME,
      closeTime: DataTypes.TIME,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: 'stores',
      underscored: true,
      timestamps: true,
    }
  );

  Store.associate = (models) => {
    Store.belongsTo(models.User, {
      foreignKey: 'id',
      as: 'owner',
    });
  };

  return Store;
};
