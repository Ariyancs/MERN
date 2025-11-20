const Joi = require('joi');

const createUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const updateUser = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional()
});

module.exports = { createUser, updateUser };
