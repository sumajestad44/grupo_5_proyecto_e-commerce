const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {
    home: (req, res) => {
        return res.render('home');
    },
    login: (req, res) => {
        return res.render('login');
    },
    register: (req, res) => {
        return res.render('register');
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



	/* VISTA DE FORMULARIO DE CREACIÓN DE PRODUCTOS */
    create: (req, res) => {
		res.render('product-create-form')
	},
	




	// Creación de producto -  Método para almacenar
	store: (req, res) => {
		let image
		if(req.files[0] != undefined){
			image = req.files[0].filename
		} else {
			image = 'default-image.png'
		};
		let newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
			image: image,
		};
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/');
	},




		// Actualizar - Formulario para editar
		edit: (req, res) => {
			let id = req.params.id
			let product = products.find(product => product.id == id)
			res.render('product-edit-form', {
				product,
			
			});
		},




		// Actualizar - Método para actualizar
		update: (req, res) => {
			let id = req.params.id;
			let productToEdit = products.find(product => product.id == id)
			let image
			if(req.files[0] != undefined){
				image = req.files[0].filename
			} else {
				image = productToEdit.image
			}
			console.log('----------');
			console.log(req.files);
			console.log('----------');
			console.log('----------');
			console.log(req.body);
			console.log('----------');
			productToEdit = {
				id: productToEdit.id,
				...req.body,
				image: image,
			};
			let newProducts = products.map(product => {
				if (product.id == productToEdit.id) {
					return product = {...productToEdit};
				}
				return product;
			})
			fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
			res.redirect('/');
		},
}
module.exports = controller;