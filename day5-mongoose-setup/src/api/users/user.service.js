// src/api/users/user.service.js
const User = require('../../models/user.model');

async function listUsers({ page = 1, limit = 10, q }) {
  const filter = {};
  if (q) {
    const regex = new RegExp(q, 'i');
    filter.$or = [{ name: regex }, { email: regex }];
  }
  const skip = (Math.max(1, page) - 1) * limit;
  const [items, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    User.countDocuments(filter)
  ]);
  return { items, meta: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) } };
}

async function getUserById(id) { return User.findById(id); }
async function createUser(payload) { const user = new User(payload); return user.save(); }
async function updateUser(id, payload) { return User.findByIdAndUpdate(id, payload, { new: true, runValidators: true }); }
async function deleteUser(id) { return User.findByIdAndDelete(id); }

module.exports = { listUsers, getUserById, createUser, updateUser, deleteUser };
