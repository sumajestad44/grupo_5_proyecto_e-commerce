const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerProducts');

//********** CONTROLLERS REQUIRES ***************//
const productsController = require('../controllers/productsController');

//********** MIDDLEWARES ***********************//
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const productCreateMiddleware = require('../middlewares/productCreateMiddleware');
const productEditMiddleware = require('../middlewares/productEditMiddleware');


//* CARRITO *//
router.get('/cart', authMiddleware, productsController.productCart);

/** DETALLE DE PRODUCTO ESPECIFICO */
router.get('/detail/:id', productsController.productDetail);

/*** CREAR UN PRODUCTO ***/ 
router.get('/create',  adminMiddleware, productsController.create); 
router.post('/create', upload.single('image'), productCreateMiddleware, productsController.store); 

/*** EDITAR UN PRODUCTO ***/
router.get('/edit/:id',  adminMiddleware,  productsController.edit);
router.put('/edit/:id', upload.single('image'), productEditMiddleware, productsController.update);

/*** BORRAR UN PRODUCTO ***/
router.post('/delete/:id', productsController.destroy);

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index);


module.exports = router;