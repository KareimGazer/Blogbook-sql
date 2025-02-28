const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User, Blog } = require('../models')
const { isStrongPassword } = require('../utils/auth_helper')
const { userExtractorHandler } = require('../middleware/auth/authenticate')
const { ROOT_USERNAME } = require('../utils/config')

const isAdmin = async (req, res, next) => {
    const user = await User.findByPk(req.userData.id)
    if (!user.admin) {
        throw new Error('NotAuthorizedError')
    }
    next()
}

router.get('/', async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ['id', 'passwordHash', 'createdAt', 'updatedAt', 'disabled', 'admin'] },
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

router.put('/:username/status', userExtractorHandler, isAdmin, async (req, res) => {
    const { username } = req.params
    const user = await User.findOne({ where: { username } })
    if (!user) throw new Error('UserNotFoundError')
    user.disabled = req.body.disabled
    await user.save()
    res.status(200).json(user)
    
})

router.put('/:username', userExtractorHandler, async (req, res) => {
    const { username } = req.params
    if (username !== req.userData.username && req.userData.username !== ROOT_USERNAME) {
        throw new Error('NotAuthorizedError')
    }
    const user = await User.findOne({ where: { username } })
    if (!user) throw new Error('UserNotFoundError')
    
    // update except the password hash
    const updatedUser = await user.update({ ...req.body, passwordHash: user.passwordHash })
    // remove the password hash
    delete updatedUser.dataValues.passwordHash
    res.status(200).json(updatedUser)
})

router.delete('/:username', userExtractorHandler, async (req, res) => {
    const { username } = req.params
    if (username !== req.userData.username && req.userData.username !== ROOT_USERNAME) {
        throw new Error('NotAuthorizedError')
    }
    const user = await User.findOne({ where: { username } })
    if (!user) throw new Error('UserNotFoundError')
    await user.destroy()
    res.status(204).end()
})

module.exports = router
