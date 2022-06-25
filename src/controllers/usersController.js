const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')
const upload = require('../middlewares/multer')

const User = require('../models/User');
const { redirect } = require('express/lib/response');
const db = require('../database/models');
const { resolveNaptr } = require('dns');
const usersFilePath = path.join(__dirname, '../data/users.json');
const allUsers = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

let usersController = {
    login: (req, res) => {
        return res.render('login');
    },
    // VISTA DEL FORMULARIO DE REGISTRO
    register: (req, res) => {
        return res.render('register');
    },
    // FUNCIÓN DE CREACIÓN DE USUARIO
    store: function(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.render("register", {
            errors: errors.errors,
            oldData: req.body
          });
        }
        let image = req.file
		if(req.file !== undefined){
			image = req.file.filename
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
        }),
        userInDb = User.findByField('email', req.body.email)
        if(userInDb){
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado',
                    }
                },
                oldData: req.body,
            })
        }
        res.redirect("/users/login")
        
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
        .then(user=>{
            res.render('users/usersEdit',{user})
        })
        return res.render('login');
    },

    loginProcess: (req,res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("login", {
                errors: errors.errors,
                oldData: req.body
            })
        }

        db.Users.findAll()
        .then(function(users){

        let userLogin = users.find((i) => i.email == req.body.email);

        if (userLogin) {
          let isOkThePassword = bcrypt.compareSync(req.body.password, userLogin.password)
            if (isOkThePassword) {
                delete userLogin.password;
                req.session.userLogged = userLogin;

                if(req.body.recordarUsuario){
                    res.cookie('userEmail', req.body.email, {maxAge: (1000 * 60) * 2 });
                }

                return res.redirect('profile');
            }
        }
      
        return res.render('login', {
            errors: {
                email: {
                    msg: 'No se encuentra este email'
                },
                password: {
                    msg: 'Contraseña incorrecta'
                }
            }
        });
})
},
    edit: (req,res)=>{
        db.Users.findByPk(req.params.id)
        .then((user)=>{
            res.render('users/usersEdit',
            {user:user})
        })
    },
    update: (req, res)=>{
        db.Users.update({
            name: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            image: req.file
        }, {
            where:{
                id: req.params.id
            }
        })
        res.redirect('/users/profile')
    },

    // ELIMINAR UN USUARIO DE LA BASE DE DATOS
    destroy : (req, res) => {
		db.Users.destroy({
            where:{
                id: req.params.id
            }
        })
        .then(() => {
            req.session.destroy();
        })
        .catch((errors)=> { console.log(errors);
        })
		res.redirect('/users/login');
		},


     profile: (req,res) => {

        db.Users.findByPk(req.params.id)
        .then((user)=>{
            res.render('users/usersProfile',
            {user:req.session.userLogged})
        })
        
        
    }, 

    logout: (req,res)=>{
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/')
    }
}

module.exports = usersController;