const express = require('express');
const router = express.Router();
const multer = require('multer');

//********** CONTROLLERS REQUIRES ***************//
const productsController = require('../controllers/productsController');

//********* MULTER *********//
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/images');
    },
    filename: function(req, file, cb){
        cb(null,file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
    }
})
var upload= multer({
    storage: storage,
});

/** DETALLE DE PRODUCTO ESPECIFICO */
router.get('/detail/:id', productsController.productDetail);

/*** CREAR UN PRODUCTO ***/ 
router.get('/create', productsController.create); 
router.post('/', upload.any(), productsController.store); 

/*** EDITAR UN PRODUCTO ***/
router.get('/edit/:id', productsController.edit);
router.patch('/edit/:id', upload.any(), productsController.update);




module.exports = router;