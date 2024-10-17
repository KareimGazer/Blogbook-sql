const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User, Blog } = require('../models')
const { isStrongPassword } = require('../utils/auth_helper')

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
        include: { model: Blog }
    })
    res.status(200).json(users)
})

router.get('/:username', extractUser, async (req, res) => {
    res.status(200).json(req.user)
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

// validation needed?
// authorization needed
router.put('/:username', extractUser, async (req, res) => {
    const user = req.user
    const updatedUser = await user.update(req.body)
    res.status(200).json(updatedUser)
})

// authorization needed
router.delete('/:username', extractUser, async (req, res) => {
    const user = req.user
    await user.destroy()
    res.status(204).end()
})

module.exports = router
