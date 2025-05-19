const service = require('./store.service');
const { success, error } = require('../../core/response');

exports.createStore = async (req, res) => {
  try {
    const result = await service.createStore(req.user.id, req.body);
    return success(res, result, 'Store created');
  } catch (err) {
    return error(res, err);
  }
};

exports.getMyStore = async (req, res) => {
  try {
    const result = await service.getMyStore(req.user.id);
    return success(res, result);
  } catch (err) {
    return error(res, err);
  }
};

exports.updateStore = async (req, res) => {
  try {
    const result = await service.updateStore(req.user.id, req.body);
    return success(res, result, 'Store updated');
  } catch (err) {
    return error(res, err);
  }
};

exports.deleteStore = async (req, res) => {
  try {
    const result = await service.deleteStore(req.user.id);
    return success(res, result, 'Store deleted');
  } catch (err) {
    return error(res, err);
  }
};

// Admin-only
exports.getAllStores = async (req, res) => {
  try {
    const result = await service.getAllStores();
    return success(res, result);
  } catch (err) {
    return error(res, err);
  }
};

exports.getStoreById = async (req, res) => {
  try {
    const result = await service.getStoreById(+req.params.id);
    return success(res, result);
  } catch (err) {
    return error(res, err);
  }
};
