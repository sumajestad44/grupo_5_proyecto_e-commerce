const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {body} = require('express-validator');
const upload = require('../middlewares/multerProducts')

//********** CONTROLLERS REQUIRES ***************//
const productsController = require('../controllers/productsController');

//********** MIDDLEWARES ***********************//
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

//********* MULTER *********//
/* var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/images/products') );
    },
    filename: function(req, file, cb){
        cb(null,file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
    }
})
var upload= multer({
    storage: storage,
}); */

//* CARRITO *//
router.get('/cart', authMiddleware, productsController.productCart);

/** DETALLE DE PRODUCTO ESPECIFICO */
router.get('/detail/:id', productsController.productDetail);

/*** CREAR UN PRODUCTO ***/ 
router.get('/create',  adminMiddleware, productsController.create); 
router.post('/create', upload.single('image'), productsController.store); 

/*** EDITAR UN PRODUCTO ***/
router.get('/edit/:id',  adminMiddleware,  productsController.edit);
router.post('/edit/:id', upload.single('image'), productsController.update);

/*** BORRAR UN PRODUCTO ***/
router.post('/delete/:id', productsController.destroy);

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index);


module.exports = router;