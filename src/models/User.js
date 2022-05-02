const fs = require('fs');
const path = require('path');
const User = {
    fileName: path.join(__dirname, '../data/users.json'),

    getData: function(){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },
    findAll: function(){
        return this.getData();
    },
    findByPk: function(){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;
    },
    findByField: function(field, text){
        let allUsers = this.findAll();
        let usersFound = allUsers.find(oneUser => oneUser[field] === text);
        return usersFound;
    }
}

module.exports = User;