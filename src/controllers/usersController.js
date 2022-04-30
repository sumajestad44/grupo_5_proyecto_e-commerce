const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

let usersController = {
    register: (req, res) => {
        return res.render('register');
    },
    
    store: function(req, res){
        let category = "User";
        let image
		if(req.files[0] != undefined){
			image = req.files[0].filename
		} else {
			image = 'default-user.png'
		};
        let newUser = {
            id: users[users.length - 1].id + 1,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            category: category,
            image: image,
        };
        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
        res.redirect('/');  
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