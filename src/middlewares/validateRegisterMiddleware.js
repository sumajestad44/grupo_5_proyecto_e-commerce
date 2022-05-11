const { body } = require('express-validator');
const path = require('path');


module.exports = [
    body('first_name').notEmpty().withMessage('Ingrese su nombre'),
    body('last_name').notEmpty().withMessage('Ingrese su apellido'),
    body('email').isEmail().withMessage('Ingrese un email válido'),
    body('password').isLength({ min: 8 }).withMessage('Ingrese una contraseña'),
    body('image').custom((value, { req }) => {
		if (req.files[0] == undefined) {
			return true;
		  }
		  if (req.files[0]) {
			let file = req.files[0];
			let acceptedExtensions = [".jpg", ".png", ".gif"];
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
			  throw new Error(
				`Las extensiones de archivo permitidas son ${acceptedExtensions.join(
				  ", "
				)}`
			  );
			}
			return true;
		  }
		}),

]


   
