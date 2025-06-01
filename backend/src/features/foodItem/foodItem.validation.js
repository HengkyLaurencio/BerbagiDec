const Joi = require('joi');

const create = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  sold: Joi.number().integer().optional(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().precision(2).required(),
  availableUntil: Joi.date().required(),
  imageUrl: Joi.string().optional(),
});

const update = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  sold: Joi.number().integer().optional(),
  quantity: Joi.number().integer().optional(),
  price: Joi.number().precision(2).optional(),
  availableUntil: Joi.date().optional(),
  imageUrl: Joi.string().optional(),
});

module.exports = { create, update };
