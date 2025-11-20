const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const authMiddleware = require('../../middleware/auth.middleware');

router.get('/me', authMiddleware, userController.getProfile);
router.put('/me', authMiddleware, userController.updateProfile);

// admin or extra endpoints (no auth by default here; secure as needed)
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
