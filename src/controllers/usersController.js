const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')

const User = require('../models/User');
const { redirect } = require('express/lib/response');
const db = require('../database/models');
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
          return res.render("users/register", {
            errors: errors.errors,
            oldData: req.body
          });
        }
        db.Users.create({
          name: req.body.first_name,
          lastName: req.body.last_name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          category: req.body.category,
          image: req.file.filename
        })
        res.redirect("/users/login")
        
    },

        //****** PERMITE QUE EL USUARIO NO SE REGISTRE CON UN EMAIL YA REGISTRADO ********//

        /* let userInDb = User.findByField('email', req.body.email);
        if(userInDb){
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado',
                    }
                },
                oldData: req.body,
            })
        } */

        //********************************************************************************//


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
                    msg: 'No se encuentra este Email'
                }
            }
        });
})
},

    // ELIMINAR UN USUARIO DE LA BASE DE DATOS
    destroy : (req, res) => {
		db.Users.destroy({
            where:{
                id: req.params.id
            }
        })
		res.redirect('/');
		},


     profile: (req,res) => {
        
        return res.render('users/usersProfile.ejs', {
            user: req.session.userLogged,
        });
    }, 

    logout: (req,res)=>{
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/')
    }
}

module.exports = usersController;