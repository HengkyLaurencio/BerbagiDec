const db = require('../../models');
const AppError = require('../../core/error');

exports.createStore = async (userId, data) => {
  const exists = await db.Store.findOne({ where: { userId } });
  if (exists) throw new AppError('You already have a store', 400);

  const user = await db.User.findOne({ where: { id: userId } });
  await user.update({role:'PARTNER'});

  return await db.Store.create({ ...data, userId });
};

exports.getMyStore = async (userId) => {
  const store = await db.Store.findOne({ where: { userId } });
  if (!store) throw new AppError('Store not found', 404);
  return store;
};

exports.updateStore = async (userId, data) => {
  const store = await db.Store.findOne({ where: { userId } });
  if (!store) throw new AppError('Store not found', 404);
  return await store.update(data);
};

exports.deleteStore = async (userId) => {
  const store = await db.Store.findOne({ where: { userId } });
  if (!store) throw new AppError('Store not found', 404);
  await store.destroy();
  return { id: store.id };
};

// Admin-only
exports.getAllStores = async () => {
  return await db.Store.findAll({
    include: [{ model: db.User, attributes: ['id', 'email'] }],
    order: [['createdAt', 'DESC']],
  });
};

exports.getStoreById = async (id) => {
  const store = await db.Store.findByPk(id, {
    include: [{ model: db.User, attributes: ['id', 'email'] }],
  });
  if (!store) throw new AppError('Store not found', 404);
  return store;
};
