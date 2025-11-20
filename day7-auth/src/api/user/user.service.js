const User = require('../../models/user.model');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);

async function createUser(data) {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw { status: 400, message: 'Email already in use' };
  if (data.password) {
    data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
  }
  return await User.create(data);
}

async function getUserById(id) {
  return await User.findById(id).select('-password');
}

async function updateUser(id, updates) {
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, SALT_ROUNDS);
  }
  return await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
}

async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}

module.exports = { createUser, getUserById, updateUser, deleteUser };
