const Joi = require('joi');

const register = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required()
});

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const forgotPassword = Joi.object({
  email: Joi.string().email().required()
});

const resetPassword = Joi.object({
  password: Joi.string().min(6).max(128).required()
});

module.exports = { register, login, forgotPassword, resetPassword };
