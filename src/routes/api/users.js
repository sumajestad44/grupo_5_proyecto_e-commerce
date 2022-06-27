const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/apiControllers/apiUsers')

router.get('/', controllers.users);
router.get('/:id', controllers.usersId);

module.exports = router;