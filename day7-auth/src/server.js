require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Routers
const authRouter = require('./api/auth/auth.router');
const userRouter = require('./api/user/user.router');
const taskRouter = require('./api/tasks/task.router');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yourdb';

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

// Start server + MongoDB connection (no deprecated options)
async function startServer() {
  try {
    // Option-less connect for driver v4+ (removes deprecation warnings)
    await mongoose.connect(MONGO_URI);

    console.log('MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to DB:', error.message);
    process.exit(1);
  }
}

startServer();
