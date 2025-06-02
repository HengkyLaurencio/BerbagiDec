const db = require('../../models');
const AppError = require('../../core/error');

exports.createTransaction = async (userId, data) => {
  const foodItem = await db.FoodItem.findByPk(data.foodItemId);

  if (!foodItem) {
    throw new AppError('Food item not found', 404);
  }

  const requestedQty = data.quantity;
  const availableQty = foodItem.quantity - foodItem.sold;

  if (requestedQty > availableQty) {
    throw new AppError('Jumlah melebihi stok tersedia', 400);
  }

  // Hitung total harga
  const total = requestedQty * foodItem.price;

  // Gunakan transaction untuk atomicity
  const sequelize = db.sequelize;

  return await sequelize.transaction(async (t) => {
    // Update sold count
    await foodItem.update(
      { sold: foodItem.sold + requestedQty },
      { transaction: t }
    );

    // Create transaction record
    const transaction = await db.Transaction.create(
      {
        userId,
        foodItemId: data.foodItemId,
        quantity: requestedQty,
        pickupTime: data.pickupTime,
        totalPrice: total,
      },
      { transaction: t }
    );

    return transaction;
  });
};


exports.getUserTransactions = async (userId) => {
  return await db.Transaction.findAll({
    where: { userId },
    include: {model: db.FoodItem},
    order: [['createdAt', 'DESC']],
  });
};

exports.getStoreTransactions = async (userId) => {
  const store = await db.Store.findOne({ where: { userId } });

  return await db.Transaction.findAll({
    include: [{model: db.FoodItem, where: { storeId: store.id }}, {model: db.User}],
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
