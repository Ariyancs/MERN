// src/seed/deleteByEmail.js
require('dotenv').config();
const { connectDB } = require('../config/db');
const User = require('../models/user.model');

async function run() {
  try {
    await connectDB(process.env.MONGO_URI);
    const res = await User.deleteOne({ email: 'ariyan@example.com' });
    console.log('deletedCount:', res.deletedCount);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
