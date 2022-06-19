module.exports = (sequelize, DataTypes) => {
    let alias = 'Carts'
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        idUsers: {
            type: DataTypes.INTEGER(11)
        },
        total: {
            type: DataTypes.DECIMAL(10,0)
        },
        idCategory: {
            type: DataTypes.INTEGER(11),
            unique: true
        },
        order: {
            type: DataTypes.INTEGER(11)
        }
  }

    let config = {
    tableName: 'cart',
    timestamps: false
}

    let Cart = sequelize.define(alias, cols, config)

   /*  Cart.associate = function(models){
        Cart.belongsTo(models.User, {foreignKey: 'idUsers'})
    } */

  return Cart
  
  }