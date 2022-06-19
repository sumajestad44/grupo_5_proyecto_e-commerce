module.exports = (sequelize, DataTypes) => {
	let alias = 'Users'
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
          },
        name:{
            type: DataTypes.STRING(100)
          },
        lastName: {
            type: DataTypes.STRING(100)
          },
        email: {
            type: DataTypes.STRING(100)
        },
        password: {
            type: DataTypes.STRING(100)
        },
        category: {
            type: DataTypes.STRING(100)
        },
        image: {
            type: DataTypes.STRING(100)
        }

    };

    let config = {
        tableName: 'users',
        timestamps: false
    }

    let User = sequelize.define(alias, cols, config)

    return User
};
