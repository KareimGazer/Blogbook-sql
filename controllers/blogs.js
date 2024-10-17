const router = require('express').Router()
const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) {
        throw new Error('BlogNotFoundError')
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
    res.status(200).json(req.blog)
})

router.post('/', async (req, res) => {
    const blog = await Blog.create(req.body)
    res.status(201).json(blog)
    // const blog = Blog.build(req.body)
    // blog.important = true
    // await blog.save()

})

// beware the likes should not be updated
router.put('/:id', blogFinder, async (req, res) => {
    const blog = req.blog
    const newBlog = {
        ...req.body,
        likes: blog.likes
    }
    const updatedBlog = await blog.update(newBlog)
    res.status(200).json(updatedBlog)
})

// like / dislike a blog
// TODO: see if the user likes it or not and reverse the state and increment or decrement accordingly
router.put('/:id/like', blogFinder, async (req, res) => {
    const blog = req.blog
    await blog.update({ likes: blog.likes + 1 })
    res.status(200).json(blog)
})

router.delete('/:id', blogFinder, async (req, res) => {
    const blog = req.blog
    await blog.destroy()
    res.status(204).end()
})

module.exports = router
