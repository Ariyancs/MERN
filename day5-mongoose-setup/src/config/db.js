// src/config/db.js
const mongoose = require('mongoose');

async function connectDB(mongoUri) {
  if (!mongoUri) throw new Error('MONGO_URI not provided');
  const opts = { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 };
  try {
    await mongoose.connect(mongoUri, opts);
    console.log('MongoDB Connected');
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
  } catch (err) {
    console.error('MongoDB Connection Failed:', err.message);
    throw err;
  }
}

module.exports = { connectDB, mongoose };
