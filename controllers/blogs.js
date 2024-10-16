const router = require('express').Router()
const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) {
        throw new Error('NotFoundError')
    }
    else {
        req.blog = blog
    }
    next()
}

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    res.status(200).json(blogs)
    // console.log(JSON.stringify(blogs, null, 2))
})

router.get('/:id', blogFinder, async (req, res) => {
    const blog = req.blog
    res.status(200).json(blog)
})

router.post('/', async (req, res) => {
    const blog = await Blog.create(req.body)
    res.status(201).json(blog)
    // const blog = Blog.build(req.body)
    // blog.important = true
    // await blog.save()

})

// beware the likes should not be updated
router.put('/:id', async (req, res) => {
    const blog = req.body
    await blog.update(req.body)
    res.status(200).json(blog)
})

router.delete('/:id', async (req, res) => {
    const blog = req.body
    await blog.destroy()
    res.status(204).end()
})

module.exports = router
