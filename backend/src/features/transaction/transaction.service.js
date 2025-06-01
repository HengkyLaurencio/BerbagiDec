const db = require('../../models');
const AppError = require('../../core/error');

exports.createTransaction = async (userId, data) => {
  const foodItem = await db.FoodItem.findByPk(data.foodItemId);
  if (!foodItem) throw new AppError('Food item not found', 404);

  const total = data.quantity * foodItem.price;

  return await db.Transaction.create({
    userId,
    foodItemId: data.foodItemId,
    quantity: data.quantity,
    pickupTime: data.pickupTime,
    totalPrice: total,
  });
};

exports.getUserTransactions = async (userId) => {
  return await db.Transaction.findAll({
    where: { userId },
    include: {model: db.FoodItem},
    order: [['createdAt', 'DESC']],
  });
};

exports.getAllTransactions = async () => {
  return await db.Transaction.findAll({
    include: {model: db.User , model: db.FoodItem},
    order: [['createdAt', 'DESC']],
  });
};

exports.updateStatus = async (id, status) => {
  const transaction = await db.Transaction.findByPk(id);
  if (!transaction) throw new AppError('Transaction not found', 404);

  transaction.status = status;
  await transaction.save();
  return transaction;
};
