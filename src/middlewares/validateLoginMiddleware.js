const { body } = require('express-validator');

module.exports = [
    body("email")
      .notEmpty()
      .withMessage("Introduzca su email ")
      .bail()
      .isEmail()
      .withMessage("Introduzca un formato de email válido"),
    body("password")
    .notEmpty()
    .withMessage("Introduzca su contraseña")
  ];