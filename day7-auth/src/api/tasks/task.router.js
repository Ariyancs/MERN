const express = require('express');
const router = express.Router();
const taskController = require('./task.controller');
const authMiddleware = require('../../middleware/auth.middleware');

// All task routes require authentication
router.post('/', authMiddleware, taskController.createTask);
router.get('/', authMiddleware, taskController.getTasks);
router.get('/:id', authMiddleware, taskController.getTask);
router.put('/:id', authMiddleware, taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);
router.patch('/:id/complete', authMiddleware, taskController.markComplete);

module.exports = router;
