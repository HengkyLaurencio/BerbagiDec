const service = require('./user.service');
const { success, error } = require('../../core/response');

exports.getProfile = async (req, res) => {
  try {
    const result = await service.getProfile(req.user.id);
    return success(res, result);
  } catch (err) {
    return error(res, err);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const result = await service.updateProfile(req.user.id, req.body);
    return success(res, result, 'Profile updated');
  } catch (err) {
    return error(res, err);
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const result = await service.deleteAccount(req.user.id);
    return success(res, result, 'Account deleted');
  } catch (err) {
    return error(res, err);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const result = await service.getUserById(+req.params.id);
    return success(res, result);
  } catch (err) {
    return error(res, err);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const result = await service.getAllUsers();
    return success(res, result);
  } catch (err) {
    return error(res, err);
  }
};
