
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

const { JWT_SECRET } = require('../utils/config')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body
    const user = await User.findOne({where: {username}})
    const isPasswordCorrect = user && await bcrypt.compare(password, user.passwordHash)

    if (isPasswordCorrect) {
        // only one could suffice but handy for conversion if you need user friendly interface/api
        const userDataPayload = {username: user.username, id: user.id}
        const token = jwt.sign(userDataPayload, JWT_SECRET, { expiresIn: "1h" })
        response.status(200).send({ token, username: user.username, name: user.name })
    } else {
        throw new Error('InvalidUsernameOrPassword')
    }
})

module.exports = loginRouter
