const Sequelize = require('sequelize');
const sequelize = require('../database'); 

module.exports = (sequelize, DataTypes) => {
	let User
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
          },
          name:{
              type: DataTypes.STRING
          },
          lastName: {
              type: DataTypes.STRING
          },
          email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING
        },
        Image: {
            type: DataTypes.STRING
        }

    }
        return User
};
