const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Blog extends Model {}
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        validate: {
            isAlpha: {
                args: true,
                msg: 'Only letters are allowed for author name'
            }
        }
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: {
                args: true,
                msg: 'Not a valid url'
            }
        }
    },
    description: {
        type: DataTypes.TEXT
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
    }, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog'
})

module.exports = Blog
