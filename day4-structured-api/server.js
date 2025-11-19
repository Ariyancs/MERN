require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { logger, checkToken, errorHandler } = require('./src/middlewares/checkToken');
const taskRouter = require('./src/api/task/task.router');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(logger);

// mount router
app.use('/api/tasks', taskRouter);

// 404
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`${process.env.APP_NAME || 'App'} listening on http://localhost:${PORT}`);
});
