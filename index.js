const { PORT, DATABASE_URL } = require('./utils/config')
const { Sequelize, Model, DataTypes } = require('sequelize')

const express = require('express')
const app = express()
app.use(express.json())

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

Blog.sync({force: false})

app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.findAll()
        res.status(200).json(blogs)
        // console.log(JSON.stringify(blogs, null, 2))
    }
    catch (error) {
        return res.status(400).json({ error })
    }
})

app.get('/api/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id)
        if (blog) {
            res.status(200).json(blog)
        }
        else {
            res.status(404).end()
        }
    }
    catch (error) {
        return res.status(400).json({ error })
    }
})

app.post('/api/blogs', async (req, res) => {
    try {
        const blog = await Blog.create(req.body)
        res.status(201).json(blog)
        // const blog = Blog.build(req.body)
        // blog.important = true
        // await blog.save()
    }
    catch (error) {
        return res.status(400).json({ error })
    }
})

// beware the likes should not be updated
app.put('/api/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id)
        if (blog) {
            await blog.update(req.body)
            res.status(200).json(blog)
        }
        else {
            res.status(404).end()
        }
    }
    catch (error) {
        return res.status(400).json({ error })
    }
})

app.delete('/api/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id)
        if (blog) {
            await blog.destroy()
            res.status(204).end()
        }
        else {
            res.status(404).end()
        }
    }
    catch (error) {
        return res.status(400).json({ error })
    }
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
