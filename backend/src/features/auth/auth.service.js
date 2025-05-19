const db = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppError = require('../../core/error');

exports.register = async ({ email, password, name, phoneNumber }) => {
  const existing = await db.User.findOne({ where: { email } });
  if (existing) throw new AppError('Email already used', 400);

  const hash = await bcrypt.hash(password, 10);

  const user = await db.User.create({
    email,
    passwordHash: hash,
    name,
    phoneNumber,
    role: 'CUSTOMER',
  });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET
  );

  return { token, user: { id: user.id, email: user.email, role: user.role } };
};

exports.login = async ({ email, password }) => {
  const user = await db.User.findOne({ where: { email } });
  if (!user) throw new AppError('User not found', 404);

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) throw new AppError('Invalid credentials', 401);

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET
  );

  return { token, user: { id: user.id, email: user.email, role: user.role } };
};
