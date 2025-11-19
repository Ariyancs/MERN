// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { connectDB } = require('./src/config/db');
const userRouter = require('./src/api/users/user.router');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);

app.use((req, res) => res.status(404).json({ status: 'error', message: 'Route not found' }));

app.use(errorHandler);

(async function start() {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server due to DB connection error. See messages above.');
    process.exit(1);
  }
})();
