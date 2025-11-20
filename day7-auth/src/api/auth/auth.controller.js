const authService = require('./auth.service');
const validations = require('../../validations/auth.validation');
const userService = require('../user/user.service'); // reuse createUser if wanted

async function register(req, res, next) {
  try {
    const { error } = validations.register.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    // You can either use authService.registerUser or userService.createUser after hashing
    const user = await authService.registerUser(req.body);
    res.status(201).json({ user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) { next(err); }
}

async function login(req, res, next) {
  try {
    const { error } = validations.login.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { user, token } = await authService.loginUser(req.body);
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) { next(err); }
}

async function forgotPassword(req, res, next) {
  try {
    const { error } = validations.forgotPassword.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { token } = await authService.createPasswordResetToken(req.body.email);
    // In production, send token via email. For dev, return it.
    res.json({ message: 'Password reset token created', token });
  } catch (err) { next(err); }
}

async function resetPassword(req, res, next) {
  try {
    const { error } = validations.resetPassword.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const token = req.params.token;
    await authService.resetPassword(token, req.body.password);
    res.json({ message: 'Password successfully reset' });
  } catch (err) { next(err); }
}

module.exports = { register, login, forgotPassword, resetPassword };
