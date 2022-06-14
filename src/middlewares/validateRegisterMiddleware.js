const { body } = require('express-validator');
const path = require('path');


module.exports = [
    body('first_name').notEmpty().isLength({ min: 2 }).withMessage('Ingrese su nombre'),
    body('last_name').notEmpty().isLength({ min: 2 }).withMessage('Ingrese su apellido'),
    body('email').isEmail().withMessage('Ingrese un email válido'),
    body('password').notEmpty().isLength({ min: 8 }).withMessage('Ingrese una contraseña'),
	body('password_confirm').custom((value, {req})=> {
		if(req.body.password != req.body.password_confirm){
			throw new Error('Las contraseñas no coinciden')
		}
		else{
			return true;
		}
	}),
    body('image').custom((value, { req }) => {
		if (req.files[0] == undefined) {
			return true;
		  }
		  if (req.files[0]) {
			let file = req.files[0];
			let acceptedExtensions = [".jpg",".jpeg", ".png", ".gif"];
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


   
