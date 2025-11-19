// src/seed/seedUsers.js
require('dotenv').config();
const { connectDB } = require('../config/db');
const User = require('../models/user.model');

async function run() {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Seeding users...');
    const users = [
      { name: 'Ariyan Bhakat', email: 'ariyan@example.com', password: 'pass123', phoneNumber: '9999999999' },
      { name: 'Riya Sen', email: 'riya@example.com', password: 'pass123', phoneNumber: '8888888888' },
      { name: 'Suresh Kumar', email: 'suresh@example.com', password: 'pass123', phoneNumber: '7777777777' }
    ];
    const inserted = await User.insertMany(users, { ordered: false });
    console.log('Inserted:', inserted.length, 'users');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
}

run();
