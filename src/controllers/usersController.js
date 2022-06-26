const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')
const upload = require('../middlewares/multer')

const User = require('../models/User');
const { redirect } = require('express/lib/response');
const db = require('../database/models');
const { resolveNaptr } = require('dns');


let usersController = {
    login: (req, res) => {
        return res.render('login');
    },
    // VISTA DEL FORMULARIO DE REGISTRO
    register: (req, res) => {
        return res.render('register');
    },
    // FUNCIÓN DE CREACIÓN DE USUARIO
    store: function (req, res) {
        const resultValidation = validationResult(req)
        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                //mapped convierte un array en objeto literal
                errors: resultValidation.mapped(),
                oldData: req.body,
            })
        }
        db.Users.findAll().then((user) => {
            let userInDB = user.find((i) => i.email == req.body.email);
            console.log(userInDB);
            if (userInDB) {
                return res.render('register', {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado',
                        },
                    },
                    oldData: req.body,
                })
            }
        })

        let image = req.file
		if(req.file != undefined){
			image = req.file
		} else {
			image = 'default-user.png'
		};
        category = "User";
        db.Users.create({
            name: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            category: "User",
            image: image
        })
        .then(() => {
            return res.redirect('/users/profile')
          })

    },



    /*       let category = "User"; 
          let image 
          if(req.files[0] != undefined){
              image = req.files[0].filename
          } else {
              image = 'default-user.png'
          }; 
          let newUser = {
              id: allUsers[allUsers.length - 1].id + 1,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, 10),
              category: category,
              image: image,
          }; 
          allUsers.push(newUser); 
          fs.writeFileSync(usersFilePath, JSON.stringify(allUsers, null, ' ')); 
      }, */

    login: (req, res) => {
        db.Users.findByPk(req.params.id)
            .then(user => {
                res.render('users/usersEdit', { user })
            })
        return res.render('login');
    },

    loginProcess: (req, res) => {

        const resultValidation = validationResult(req)
        if (resultValidation.errors.length > 0) {
            return res.render('login', {
                //mapped convierte un array en objeto literal
                errors: resultValidation.mapped(),
                oldData: req.body,
            })
        }

        db.Users.findAll()
        .then(function (user) {

            let userLogin = user.find((i) => i.email == req.body.email);

                if (userLogin) {
                    let isOkThePassword = bcrypt.compareSync(req.body.password, userLogin.password)
                    if (isOkThePassword) {
                        delete userLogin.password;
                        req.session.userLogged = userLogin;

                        if (req.body.recordarUsuario) {
                            res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2 });
                        }

                        return res.redirect('/users/profile');
                    }
                    return res.render('login', {
                        errors: {
                            password: {
                                msg: 'Contraseña incorrecta'
                            },
                        }
                    });
                }
                return res.render('login', {
                    errors: {
                        email:{
                            msg: 'No se encuentra este email'
                        }
                    }
                })

        })
    },




    edit: (req, res) => {
        db.Users.findByPk(req.params.id)
            .then((user) => {
                res.render('users/usersEdit',
                    { user: user })
            })
    },
    update: (req, res) => {

        const resultValidation = validationResult(req)
        
        const id = req.params.id

        db.Users.findByPk(id)
            .then((user) => {

                db.Users.update({
                    name: req.body.first_name,
                    lastName: req.body.last_name,
                    email: req.body.email,
                    image: req.file == undefined ? user.image : req.file.filename
                }, {
                    where: {
                        id: id
                    }
                })
                req.session.userLogged = {
                    id: id,
                    name: req.body.first_name,
                    lastName: req.body.last_name,
                    email: req.body.email,
                    category: user.category,
                    image: req.file == undefined ? user.image : req.file.filename
                },

                    res.redirect('/users/profile')
            })
    },

    // ELIMINAR UN USUARIO DE LA BASE DE DATOS
    destroy: (req, res) => {

        db.Users.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                console.log('hola');
                req.session.destroy();
                res.redirect('/users/login');
            })
            .catch((errors) => {
                console.log(errors);
            })

    },


    profile: (req, res) => {

        db.Users.findByPk(req.params.id)
            .then((user) => {
                res.render('users/usersProfile',
                    { user: req.session.userLogged })
            })


    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/')
    }
}

module.exports = usersController;