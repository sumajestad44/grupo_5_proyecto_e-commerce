const express = require('express');
const router = express.Router();
const {body} = require('express-validator');

const productsController = require('../controllers/productsController');

router.get('/', productsController.home);

/* router.get('/suscripciones', productsController.subs); */

module.exports = router;