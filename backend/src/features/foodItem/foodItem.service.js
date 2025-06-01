const db = require('../../models');
const AppError = require('../../core/error');

exports.create = async (userId, data) => {
  //  const store = await db.Store.findBy(storeId);
  const store = await db.Store.findOne({ where: { userId } });
  if (!store) throw new AppError('Store not found', 404);
  return await db.FoodItem.create({ ...data, storeId: store.id });
};

exports.findAll = async () => {
  return await db.FoodItem.findAll({ include: db.Store });
};

exports.findAllByStore = async (userId) => {
  return await db.FoodItem.findAll({
    include: {
      model: db.Store,
      where: { userId },
    },
  });
};

exports.findById = async (id) => {
  const item = await db.FoodItem.findByPk(id, { include: db.Store });
  if (!item) throw new AppError('Food item not found', 404);
  return item;
};

exports.update = async (id, data) => {
  const item = await db.FoodItem.findByPk(id);
  if (!item) throw new AppError('Food item not found', 404);
  return await item.update(data);
};

exports.delete = async (id) => {
  const item = await db.FoodItem.findByPk(id);
  if (!item) throw new AppError('Food item not found', 404);
  await item.destroy();
  return { id };
};
