const { body } = require('express-validator');
const path = require('path');


module.exports = [
    body('first_name').notEmpty().withMessage('Ingrese su nombre'),
    body('last_name').notEmpty().withMessage('Ingrese su apellido'),
    body('email').notEmpty().withMessage('Ingrese su email').isEmail().withMessage('Ingrese un email válido'),
    body('password').isLength({ min: 8 }).withMessage('Ingrese una contraseña con un mínimo de 8 caracteres'),
    /**body('image').custom((value, {req})) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif']

        let fileExtension = path.extname(file.originalname);
        if(!acceptedExtensions.includes(fileExtension)){
            throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
        }
        return true;
    }
    */
]