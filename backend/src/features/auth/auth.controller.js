const service = require('./auth.service');
const { success, error } = require('../../core/response');

exports.register = async (req, res) => {
  try {
    const result = await service.register(req.body);
    return success(res, result, 'User registered');
  } catch (err) {
    return error(res, err, err.statusCode || 500);
  }
};

exports.login = async (req, res) => {
  try {
    const result = await service.login(req.body);
    return success(res, result, 'Login successful');
  } catch (err) {
    return error(res, err, err.statusCode || 401);
  }
};
