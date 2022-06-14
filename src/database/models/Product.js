const Sequelize = require('sequelize');
const sequelize = require('../database'); 

module.exports = (sequelize, DataTypes) => {
    let alias = 'Products'
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING(100)
        },
        description: {
            type: DataTypes.STRING(100)
        },
        idCategory: {
            type: DataTypes.INTEGER(11),
            unique: true
        },
        price: {
            type: DataTypes.DECIMAL(10,0)
        },
        image: {
            type: DataTypes.STRING(100)
        },
        size: {
            type: DataTypes.STRING(100)
        }
  }

    let config = {
    tableName: 'products',
    timestamps: false
}

    let Product = sequelize.define(alias, cols, config)

    Product.associate = function(models){
        Product.belongsTo(models.Category, {foreignKey: 'idProduct'})
    }


  return Product
  }