const fs = require('fs');
const path = require('path');
const db = require('../database/models');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {
    home: (req, res) => {
		db.Products.findAll()
		.then(function(products){
			return res.render('home');
		})
        
    },
    productCart: (req, res) => {
        return res.render('productCart');
    },
    productDetail: (req, res) => {
		let id = req.params.id
			let product = products.find(product => product.id == id)
			res.render('productDetail', {
				product,
			
			});
    },

/* 	subs:(req, res) => {
		return res.render('subs');
	}, */


	/* VISTA DE FORMULARIO DE CREACIÓN DE PRODUCTOS */
    create: (req, res) => {
		res.render('product-create-form')
	},
	

	// Creación de producto -  Método para almacenar
	store: (req, res) => {
		db.Products.create({
			name: req.body.name,
			description: req.body.description,
			category: req.body.category,
			price: req.body.price,
			image: req.file.filename,
			size: req.body.size
		  })
		  res.redirect("/products")
		  
	  },


		// Actualizar - Formulario para editar
		edit: (req, res) => {
			db.Products.findByPk(req.params.id)
			.then(function(product){
				res.render("product-edit-form", {product:product})
			})
		},
		

		// Actualizar - Método para actualizar
		update: (req, res) => {
			db.Products.update({
			name: req.body.name,
			description: req.body.description,
			category: req.body.category,
			price: req.body.price,
			image: req.file.filename,
			size: req.body.size
		},
		{
			where:{
				id: req.params.id
			}
		})
		res.redirect("/products")
		
	},


		// Borrar un producto
		destroy : (req, res) => {
			db.Products.destroy({
				where:{
					id: req.params.id
				}
			})
		res.redirect('/products');
		},

		//	Root - Show all products
			index: (req, res) => {
				db.Products.findAll()
				.then(productos =>{
				res.render('products', {productos})

				})
		},

}
module.exports = controller;