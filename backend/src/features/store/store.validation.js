const Joi = require('joi');

const schema = {
  storeName: Joi.string().required(),
  storeDescription: Joi.string().allow('').optional(),
  storeAddress: Joi.string().optional(),
  latitude: Joi.number().precision(6).optional(),
  longitude: Joi.number().precision(6).optional(),
  openTime: Joi.string()
    .regex(/^\d{2}:\d{2}(:\d{2})?$/)
    .optional(),
  closeTime: Joi.string()
    .regex(/^\d{2}:\d{2}(:\d{2})?$/)
    .optional(),
};

exports.createStore = Joi.object(schema);
exports.updateStore = Joi.object(schema);
