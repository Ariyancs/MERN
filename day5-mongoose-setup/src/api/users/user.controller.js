// src/api/users/user.controller.js
const userService = require('./user.service');
const responses = require('../../utility/responses');

async function list(req, res, next) {
  try {
    const { page = 1, limit = 10, q } = req.query;
    const result = await userService.listUsers({ page, limit, q });
    return res.json(responses.success(result.items, result.meta));
  } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });
    return res.json(responses.success(user));
  } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    const created = await userService.createUser(req.body);
    return res.status(201).json(responses.created(created));
  } catch (err) {
    if (err.code === 11000) { err.status = 400; err.message = 'Email already exists'; }
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const updated = await userService.updateUser(req.params.id, req.body);
    if (!updated) return res.status(404).json({ status: 'error', message: 'User not found' });
    return res.json(responses.success(updated));
  } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    const removed = await userService.deleteUser(req.params.id);
    if (!removed) return res.status(404).json({ status: 'error', message: 'User not found' });
    return res.json(responses.success(removed));
  } catch (err) { next(err); }
}

module.exports = { list, getById, create, update, remove };

