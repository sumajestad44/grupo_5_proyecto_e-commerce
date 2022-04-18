const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

let usersController = {
    login: (req, res) => {
        return res.render('login');
    },
    register: (req, res) => {
        return res.render('register');
    },
    
    store: function(req, res){
        let image = 'default-user.png';
        let category = "User";
        let newUser = {
            id: users[users.length - 1].id + 1,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            category: category,
            image: image,
        };
        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
        res.redirect('/');
        
    },
    
}

module.exports = usersController;