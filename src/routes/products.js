const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {body} = require('express-validator');

//********** CONTROLLERS REQUIRES ***************//
const productsController = require('../controllers/productsController');

//********** MIDDLEWARES ***********************//
const authMiddleware = require('../middlewares/authMiddleware');

//********* MULTER *********//
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/images/products') );
    },
    filename: function(req, file, cb){
        cb(null,file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
    }
})
var upload= multer({
    storage: storage,
});

//* CARRITO *//
router.get('/cart', authMiddleware, productsController.productCart);

/** DETALLE DE PRODUCTO ESPECIFICO */
router.get('/detail/:id', productsController.productDetail);

/*** CREAR UN PRODUCTO ***/ 
router.get('/create', productsController.create); 
router.post('/', upload.any(), productsController.store); 

/*** EDITAR UN PRODUCTO ***/
router.get('/edit/:id', productsController.edit);
router.put('/edit/:id', upload.any(), productsController.update);

/*** BORRAR UN PRODUCTO ***/
router.delete('/delete/:id', productsController.destroy);

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index);


module.exports = router;