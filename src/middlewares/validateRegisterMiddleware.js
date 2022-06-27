const { body } = require('express-validator');
const path = require('path');


module.exports = [
	body('first_name').notEmpty().withMessage('Ingrese su nombre').isLength({ min: 2 }).withMessage('Su nombre debe contener más de dos caracteres'),
	body('last_name').notEmpty().withMessage('Ingrese su apellido').isLength({ min: 2 }).withMessage('Su apellido debe contener más de dos caracteres'),
	body('email').isEmail().withMessage('Ingrese un email válido'),
	body('password').notEmpty().withMessage('Ingrese una contraseña').isLength({ min: 8 }).withMessage('La contraseña debe tener como mínimo 8 caracteres'),
	body('password_confirm').custom((value, { req }) => {
		if (req.body.password != req.body.password_confirm) {
			throw new Error('Las contraseñas no coinciden')
		}
		else {
			return true;
		}
	}),
	 body('image').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
		if (!file) {
			return true
		  } else {
			let fileExtension = path.extname(file.originalname)
			if (!acceptedExtensions.includes(fileExtension)) {
			  throw new Error(
				`Las extensiones aceptadas son ${acceptedExtensions.join(',')}`,
			  )
			}
		  }
		  return true
	})

]



