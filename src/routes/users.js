const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const usersController = require('../controllers/usersController');

const {body} = require('express-validator');


// MIDDLEWARES
const validateRegisterMiddleware = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

//********* MULTER *********//
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/images/users') );
    },
    filename: function(req, file, cb){
        cb(null,file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
    }
})
var upload= multer({
    storage: storage,
});
//****************************** */





// RUTAS
// Login
router.get('/login', guestMiddleware, usersController.login);

// Procesamiento de formulario de login
router.post('/login', usersController.loginProcess);

// Register
router.get('/register', guestMiddleware, usersController.register);

// Procesamiento de formulario de registro
router.post('/register', upload.any(), validateRegisterMiddleware, usersController.store);

// Eliminar un usuario de la base de datos
//*router.delete('/delete/:id', usersController.destroy);*//

// Perfil de usuario
router.get('/profile', authMiddleware, usersController.profile);

// Logout
router.get('/logout', usersController.logout)

module.exports = router;