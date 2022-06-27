const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  home: (req, res) => {
    db.Products.findAll()
      .then(function (products) {
        return res.render("home");
      });
  },
  productCart: (req, res) => {
    db.Products.findAll().then(function (product) {
      res.render("productCart", { product });
    });
    
  },
  productDetail: (req, res) => {
    db.Products.findByPk(req.params.id).then(function (product) {
      res.render("productDetail", { product: product });
    });
  },

  /* 	subs:(req, res) => {
    return res.render('subs');
  }, */

  /* VISTA DE FORMULARIO DE CREACIÓN DE PRODUCTOS */
  create: (req, res) => {
    res.render("product-create-form");
  },

  // Creación de producto -  Método para almacenar
  store: (req, res) => {
    const resultValidation = validationResult(req)

    if (resultValidation.errors.length > 0) {
      return res.render('products/create', {
        //mapped convierte un array en objeto literal
        errors: resultValidation.mapped(),
        oldData: req.body,
      })
    }
    if (req.file) {
      if (req.file.filename) {
        db.Products.create({
          name: req.body.name,
          description: req.body.description,
          category: req.body.category,
          price: req.body.price,
          image: req.file.filename,
          size: req.body.size,
        })
          .then(() => {
            res.redirect("/products");
          })
      }
    }
    else {
      res.render('product-create-form', {
        errors: {
          image: {
            msg: 'Suba una imagen!!!!!!'
          }
        }
      }
      );
    }
  },

  // Actualizar - Formulario para editar
  edit: (req, res) => {
    db.Products.findByPk(req.params.id)
      .then(function (product) {
        res.render("product-edit-form", { product: product });
      });
  },

  // Actualizar - Método para actualizar
  update: (req, res) => {
    const resultValidation = validationResult(req);
    const id = req.params.id;
    db.Products.findByPk(id).then((product) => {
      if (resultValidation.errors.length > 0) {
        return res.render("product-edit-form", {
          //mapped convierte un array en objeto literal
          errors: resultValidation.mapped(),
          oldData: req.body,
        });
      }
      db.Products.update(
        {
          name: req.body.name || product.name,
          description: req.body.description || product.description,
          category: req.body.category || product.category,
          price: req.body.price || product.price,
          image: req.file == undefined ? product.image : req.file.filename,
          size: req.body.size || product.size,
        },
        {
          where: {
            id: id,
          },
        }
      )
        .then(() => {
          return res.redirect("/products");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },

  // Borrar un producto
  destroy: (req, res) => {
    db.Products.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        res.redirect("/products");
      });

  },

  //	Root - Show all products
  index: (req, res) => {
    db.Products.findAll().then((productos) => {
      res.render("products", { productos });
    });
  },
};
module.exports = controller;
