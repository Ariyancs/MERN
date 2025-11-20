const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../../models/user.model');
const PasswordResetToken = require('../../models/passwordResetToken.model');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);

async function registerUser({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) throw { status: 400, message: 'Email already in use' };

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({ name, email, password: hashed });
  return user;
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw { status: 401, message: 'Invalid email or password' };

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw { status: 401, message: 'Invalid email or password' };

  const token = jwt.sign({ sub: user._id.toString(), email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return { user, token };
}

async function createPasswordResetToken(email) {
  const user = await User.findOne({ email });
  if (!user) throw { status: 404, message: 'User not found' };

  // create token and store
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  await PasswordResetToken.create({ userId: user._id, token, expiresAt });

  // In prod, email token to user. For dev, return token.
  return { token, user };
}

async function resetPassword(token, newPassword) {
  const record = await PasswordResetToken.findOne({ token });
  if (!record) throw { status: 400, message: 'Invalid or expired token' };
  if (record.expiresAt < new Date()) {
    await record.deleteOne();
    throw { status: 400, message: 'Token expired' };
  }

  const user = await User.findById(record.userId);
  if (!user) throw { status: 404, message: 'User not found' };

  const hashed = await bcrypt.hash(newPassword, SALT_ROUNDS);
  user.password = hashed;
  await user.save();

  await record.deleteOne();
  return user;
}

module.exports = { registerUser, loginUser, createPasswordResetToken, resetPassword };
