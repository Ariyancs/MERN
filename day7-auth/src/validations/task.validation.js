const Joi = require('joi');

const createTask = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  status: Joi.string().valid('pending', 'complete').optional(),
  dueDate: Joi.date().optional()
});

const updateTask = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  status: Joi.string().valid('pending', 'complete').optional(),
  dueDate: Joi.date().optional()
});

module.exports = { createTask, updateTask };
