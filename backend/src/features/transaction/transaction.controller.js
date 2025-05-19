const service = require('./transaction.service');
const { success, error } = require('../../core/response');

exports.create = async (req, res) => {
  try {
    const result = await service.createTransaction(req.user.id, req.body);
    return success(res, result, 'Transaction created');
  } catch (err) {
    return error(res, err);
  }
};

exports.getMyTransactions = async (req, res) => {
  try {
    const result = await service.getUserTransactions(req.user.id);
    return success(res, result);
  } catch (err) {
    return error(res, err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await service.getAllTransactions();
    return success(res, result);
  } catch (err) {
    return error(res, err);
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const result = await service.updateStatus(req.params.id, req.body.status);
    return success(res, result, 'Transaction status updated');
  } catch (err) {
    return error(res, err);
  }
};
