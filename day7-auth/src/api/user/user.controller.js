const userService = require('./user.service');
const validations = require('../../validations/user.validation');

async function getProfile(req, res, next) {
  try {
    const user = await userService.getUserById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) { next(err); }
}

async function updateProfile(req, res, next) {
  try {
    const { error } = validations.updateUser.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const user = await userService.updateUser(req.userId, req.body);
    res.json(user);
  } catch (err) { next(err); }
}

async function createUser(req, res, next) {
  try {
    const { error } = validations.createUser.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const user = await userService.createUser(req.body);
    res.status(201).json({ id: user._id, email: user.email, name: user.name });
  } catch (err) { next(err); }
}

async function deleteUser(req, res, next) {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) { next(err); }
}

module.exports = { getProfile, updateProfile, createUser, deleteUser };
