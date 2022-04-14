const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/login', userController.login);

router.get('/register', userController.register);

module.exports = router;