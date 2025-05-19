const { Sequelize } = require('sequelize');
const User = require('./user.model');
const Store = require('./store.model');
const FoodItem = require('./foodItem.model');
const Transaction = require('./transaction.model');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Define models
db.User = User(sequelize, Sequelize.DataTypes);
db.Store = Store(sequelize, Sequelize.DataTypes);
db.FoodItem = FoodItem(sequelize, Sequelize.DataTypes);
db.Transaction = Transaction(sequelize, Sequelize.DataTypes);

// Define associations
db.User.hasOne(db.Store, { foreignKey: 'userId' });
db.Store.belongsTo(db.User);

db.Store.hasMany(db.FoodItem, { foreignKey: 'storeId' });
db.FoodItem.belongsTo(db.Store);

db.User.hasMany(db.Transaction, { foreignKey: 'userId' });
db.FoodItem.hasMany(db.Transaction, { foreignKey: 'foodItemId' });
db.Transaction.belongsTo(db.User);
db.Transaction.belongsTo(db.FoodItem);

module.exports = db;
