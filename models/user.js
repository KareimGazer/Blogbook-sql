const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class User extends Model {}

// TODO: number of blogs and number of likes
// you many need to use SQL functions if they exist or look in postgreSQL
// useful for the leaderboard
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isAlphanumeric: {
                args: true,
                msg: 'Only letters and numbers are allowed for username'
            }
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: {
                args: true,
                msg: 'Not a valid email'
            }
        }
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bio: {
        type: DataTypes.TEXT
    },
    image: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'user'
})

module.exports = User
