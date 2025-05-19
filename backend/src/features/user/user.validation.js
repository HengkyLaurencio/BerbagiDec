const Joi = require('joi');

const updateProfile = Joi.object({
  name: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
});

module.exports = { updateProfile };
