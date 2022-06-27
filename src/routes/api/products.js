const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/apiControllers/apiProducts')

router.get('/', controllers.products);
router.get('/:id', controllers.productsId);

module.exports = router;