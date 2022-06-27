const db = require("../../database/models");
const controllers = {
    users: (req,res)=>{
        db.Users.findAll()
        .then((users)=>{
            for (let i = 0; i < users.length; i++) {
                users[i].setDataValue('detalle','http://localhost:3020/api/users/' + users[i].id) 
            }
            for (let i = 0; i < users.length; i++) {
                users[i].setDataValue('imagen', 'http://localhost:3020/images/users/' + users[i].image)     
            }
            res.status(200).json({
                count: users.length,
                data: users,
                status:200
            })

        })
    },

    usersId: (req, res) => {
        db.Users.findByPk(req.params.id)
          .then((users)=>{
            res.json({ 
                data: users,
                status: 200
            })
          })
      },
  
}

module.exports = controllers;