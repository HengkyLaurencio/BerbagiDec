const Joi = require('joi');

const create = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().precision(2).required(),
  originalPrice: Joi.number().precision(2).optional(),
  availableUntil: Joi.date().required(),
  imageUrl: Joi.string().uri().optional(),
});

const update = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  quantity: Joi.number().integer().optional(),
  price: Joi.number().precision(2).optional(),
  originalPrice: Joi.number().precision(2).optional(),
  availableUntil: Joi.date().optional(),
  imageUrl: Joi.string().uri().optional(),
});

module.exports = { create, update };
