// src/api/users/user.router.js
const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

router.get('/', controller.list);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
