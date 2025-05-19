const jwt = require('jsonwebtoken');
const AppError = require('../core/error');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Unauthorized: No token provided', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ex: { id: "...", role: "USER" }
    next();
  } catch (err) {
    return next(new AppError('Invalid or expired token', 401));
  }
};
