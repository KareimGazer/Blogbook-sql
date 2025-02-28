const router = require('express').Router()
const { Blog } = require('../models')
const { sequelize } = require('../utils/db')

// the original authors of the blogs as opposed to the users who posted the blogs
// a similar one is needed for the users to make a leader board

router.get('/', async (req, res) => {
    const authors = await Blog.findAll({
        attributes: ['author',
            [sequelize.fn('COUNT', sequelize.col('likes')), 'likes'],
            [sequelize.fn('COUNT', sequelize.col('id')), 'n_articles']
        ],
        group: 'author',
        order: [[sequelize.fn('COUNT', sequelize.col('likes')), 'DESC']]
    })
    res.status(200).json(authors)
})

module.exports = router