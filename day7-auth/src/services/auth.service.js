const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;

async function registerUser({ name, email, password }) {
  // check existing
  const exists = await User.findOne({ email });
  if (exists) throw { status: 400, message: "Email already registered" };

  // hash
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);

  const user = new User({ name, email, password: hashed });
  return await user.save();
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw { status: 401, message: "Invalid credentials" };

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw { status: 401, message: "Invalid credentials" };

  // generate token
  const payload = { sub: user._id.toString(), role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP || "1h" });

  // optional refresh token generation can be added here
  return { user, token };
}

module.exports = { registerUser, loginUser };
