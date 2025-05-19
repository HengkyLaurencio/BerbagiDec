const db = require('../../models');
const AppError = require('../../core/error');

exports.getProfile = async (userId) => {
  const user = await db.User.findByPk(userId, {
    attributes: ['id', 'email', 'name', 'role', 'phoneNumber'],
  });
  if (!user) throw new AppError('User not found', 404);
  return user;
};

exports.updateProfile = async (userId, data) => {
  const user = await db.User.findByPk(userId);
  if (!user) throw new AppError('User not found', 404);

  await user.update(data);
  return { id: user.id, email: user.email, name: user.name };
};

exports.deleteAccount = async (userId) => {
  const user = await db.User.findByPk(userId);
  if (!user) throw new AppError('User not found', 404);
  await user.destroy();
  return { id: userId };
};

exports.getUserById = async (id) => {
  const user = await db.User.findByPk(id, {
    attributes: ['id', 'email', 'name', 'role'],
  });
  if (!user) throw new AppError('User not found', 404);
  return user;
};

exports.getAllUsers = async () => {
  return await db.User.findAll({
    attributes: ['id', 'email', 'name', 'role'],
    order: [['createdAt', 'DESC']],
  });
};
