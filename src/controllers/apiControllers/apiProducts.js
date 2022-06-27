const db = require("../../database/models");
const controllers = {
    products: (req,res)=>{
        db.Products.findAll()
        .then((products)=>{
            for (let i = 0; i < products.length; i++) {
                products[i].setDataValue('detalle','http://localhost:3020/api/products/' + products[i].id) 
            }
            for (let i = 0; i < products.length; i++) {
                products[i].setDataValue('image', 'http://localhost:3020/images/products/' + products[i].image)     
            }
            res.status(200).json({
                count: products.length,
                data: products,
                status:200
            })

        })
    },

    productsId: (req, res) => {
        db.Products.findByPk(req.params.id)
          .then((products)=>{
            res.json({ 
                data: products,
                status: 200
            })
          })
      },
  
}

module.exports = controllers;
