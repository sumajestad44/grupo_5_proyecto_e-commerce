const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

router.get('/', productsController.home);

router.get('/login', productsController.login);

router.get('/register', productsController.register);

router.get('/cart', productsController.productCart);



module.exports = router;