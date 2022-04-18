const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

const {body} = require('express-validator');

// VALIDACIONES
const validateRegister = [
    body('nombre').notEmpty().withMessage('Ingrese su nombre'),
    body('apellido').notEmpty().withMessage('Ingrese su apellido'),
    body('email').isEmail().withMessage('Ingrese un email válido'),
];

// RUTAS
// Login
router.get('/login', usersController.login);

// Register
router.get('/register', usersController.register);
// Procesamiento de formulario de registro
router.post('/register', validateRegister, usersController.store);

module.exports = router;