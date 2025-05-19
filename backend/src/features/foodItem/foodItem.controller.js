const service = require('./foodItem.service');
const { success, error } = require('../../core/response');

exports.create = async (req, res) => {
  try {
    const result = await service.create(req.user.id, req.body);
    return success(res, result, 'Food item created');
  } catch (err) {
    return error(res, err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await service.findAll();
    return success(res, result);
  } catch (err) {
    return error(res, err);
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await service.findById(+req.params.id);
    return success(res, result);
  } catch (err) {
    return error(res, err);
  }
};

exports.update = async (req, res) => {
  try {
    const result = await service.update(+req.params.id, req.body);
    return success(res, result, 'Food item updated');
  } catch (err) {
    return error(res, err);
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await service.delete(+req.params.id);
    return success(res, result, 'Food item deleted');
  } catch (err) {
    return error(res, err);
  }
};
