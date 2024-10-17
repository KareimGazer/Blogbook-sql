const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User, Blog } = require('../models')
const { isStrongPassword } = require('../utils/auth_helper')
const { userExtractorHandler } = require('../middleware/auth/authenticate')
const { ROOT_USERNAME } = require('../utils/config')

const extractUser = async (req, res, next) => {
    const { username } = req.params
    const user = await User.findOne({where: {username}})
    if (user) {
        req.user = user
    } else {
        throw new Error('UserNotFoundError')
    }
    next()
}

router.get('/', async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ['id', 'passwordHash', 'createdAt', 'updatedAt'] },
        include: { model: Blog, attributes: ['title', 'author', 'url', 'likes', 'date'] }
    })
    res.status(200).json(users)
})

router.get('/:username', async (req, res) => {
    //const user = await User.findOne({ where: { username: req.params.username } })
    const user = await User.findOne({
        where: { username: req.params.username },
        include: { model: Blog, attributes: ['title', 'author', 'url', 'likes', 'date'] },
        attributes: { exclude: ['id', 'passwordHash', 'createdAt', 'updatedAt'] }
    })
    res.status(200).json(user)
})

// register
router.post('/', async (request, response) => {
    const { username, name, password, email, bio, image } = request.body
    if (!isStrongPassword(password)) {
        throw new Error('WeekPasswordError')
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = User.build({ username, name, passwordHash, email, bio, image })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

// validation needed? gaurd against password hash
router.put('/:username', extractUser, userExtractorHandler, async (req, res) => {
    const userTobeModified = req.user.username
    if (userTobeModified !== req.userData.username && req.userData.username !== ROOT_USERNAME) {
        throw new Error('NotAuthorizedError')
    }
    const user = req.user
    const updatedUser = await user.update(req.body)
    res.status(200).json(updatedUser)
})

router.delete('/:username', extractUser, userExtractorHandler, async (req, res) => {
    const userTobeDeleted = req.user.username
    if (userTobeDeleted !== req.userData.username && req.userData.username !== ROOT_USERNAME) {
        throw new Error('NotAuthorizedError')
    }
    const user = req.user
    await user.destroy()
    res.status(204).end()
})

module.exports = router
