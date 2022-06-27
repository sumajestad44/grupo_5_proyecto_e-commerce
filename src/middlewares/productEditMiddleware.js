const { body } = require("express-validator");
const path = require("path");
module.exports = [
  body("name")
    .notEmpty()
    .withMessage("Introduzca un nombre para el producto ")
    .isLength({ min: 5 })
    .withMessage("El nombre del producto debe tener 5 caracteres como minimo"),
  body("description")
    .notEmpty()
    .withMessage("Introduzca una descripción para el producto")
    .isLength({ min: 20 })
    .withMessage(
      "La descripción del producto debe tener al menos 20 caracteres"
    ),
/*   body("category")
    .notEmpty()
    .withMessage("Debe seleccionar una categoría para el producto"),
*/  body("price").notEmpty().withMessage("Debe colocar un precio al producto"),
  /* body("image").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png", ".gif", ".jpeg"];
    if (!file) {
      throw new Error("Sube una imagen para el producto");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones de imagen aceptadas son ${acceptedExtensions.join(
            ","
          )}`
        );
      }
    }
    return true;
  }), */
];