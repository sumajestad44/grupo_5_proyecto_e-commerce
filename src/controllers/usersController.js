const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')

const User = require('../models/User')
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

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
        const resultValidation = validationResult(req);

        //*****  VERIFICA SI HAY ERRORES *******//
        if(resultValidation.errors.length>0){
            return res.render('register', {
                errors: resultValidation.mapped()
            });
        }
        //**************************************//


        //****** PERMITE QUE EL USUARIO NO SE REGISTRE CON UN EMAIL YA REGISTRADO ********//
        let userInDb = User.findByField('email', req.body.email);
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
        //********************************************************************************//


        let category = "User"; // definir la categoria
        let image // definir la imagen
		if(req.files[0] != undefined){
			image = req.files[0].filename
		} else {
			image = 'default-user.png'
		}; // logica para que tome la imagen que se envia por el formulario y si no hay que ponga una por defecto
        let newUser = {
            id: users[users.length - 1].id + 1,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10), // uso bcrypt para encriptar la contraseña 
            category: category,
            image: image,
        }; // Creamos la variable newUser donde se va a almacenar toda la información que viene por body
        users.push(newUser); // y le hacemos push en users
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' ')); // no me acuerdo q hacia, creo que escribía sobre el json
        res.redirect('/'); // y un redirect
        
    },

    login: (req, res) => {
        console.log(req.session);
        return res.render('login');
    },

    loginProcess: (req,res) => {
        let userLogin = users.findByField('email', req.body.email);

        if (userLogin) {
            let isOkThePassword = bcrypt.compareSync(req.body.password, userLogin.password)
            if (isOkThePassword) {
                delete userLogin.password;
                req.session.userLogged = userLogin;
                return res.redirect('/src/views/home.ejs');
            }
        }
        return res.render('login', {
            errors: {
                email: {
                    msg: 'No se encuentra este Email'
                }
            }
        });
    },

    profile: (req,res) => {
        return res.render('usersProfile');
    },

    logout: (req,res)=>{
        req.session.destroy();
        return res.redirect('/')
    }
    
}

module.exports = usersController;