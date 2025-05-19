const Joi = require('joi');

const create = Joi.object({
  foodItemId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
  pickupTime: Joi.date().required(),
});

const updateStatus = Joi.object({
  status: Joi.string().valid('pending', 'completed', 'cancelled').required(),
});

module.exports = { create, updateStatus };
