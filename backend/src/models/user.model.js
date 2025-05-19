module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM('CUSTOMER', 'PARTNER', 'ADMIN'),
        defaultValue: 'CUSTOMER',
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'users',
    }
  );

  return User;
};
