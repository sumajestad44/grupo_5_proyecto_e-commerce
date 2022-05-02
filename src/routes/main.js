const express = require('express');
const router = express.Router();
const {body} = require('express-validator');

const productsController = require('../controllers/productsController');

router.get('/', productsController.home);

router.get('/cart', productsController.productCart);



module.exports = router;