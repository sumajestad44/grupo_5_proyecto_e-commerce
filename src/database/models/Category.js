const Sequelize = require('sequelize');
const sequelize = require('../database'); 

module.exports = (sequelize, DataTypes) => {
	let alias = 'Categories'
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
          },
        idProduct: {
            type: DataTypes.INTEGER(100),
            unique: true
        },
        productName: {
            type: DataTypes.STRING(100)
        }
    }

    let config = {
        tableName: 'categories',
        timestamps: false
    }

    let Category = sequelize.define(alias, cols, config)

        return Category
};