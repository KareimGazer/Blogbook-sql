const { DATABASE_URL } = require('./utils/config')
const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize(DATABASE_URL, {dialect: 'postgres'})

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
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    date: {
        type: DataTypes.DATE
    }
    }, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
})

Blog.sync({ force: false })

module.exports = Blog
