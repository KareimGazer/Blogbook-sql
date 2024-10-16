const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.findAll()
        res.status(200).json(blogs)
        // console.log(JSON.stringify(blogs, null, 2))
    }
    catch (error) {
        return res.status(400).json({ error })
    }
})

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

module.exports = router