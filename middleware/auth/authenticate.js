const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../utils/config')

const tokenExtractorHandler = (request, response, next) => {
    let authorization = request.get('authorization')
    if (authorization) {
        // Remove surrounding quotes if present
        if (authorization.startsWith('"') && authorization.endsWith('"')) {
            authorization = authorization.slice(1, -1)
        }
        // Trim any whitespace
        const trimmedAuth = authorization.trim()
        if (trimmedAuth.toLowerCase().startsWith('bearer ')) {
            request.token = trimmedAuth.substring(7).trim()
        } else {
            request.token = null
        }
    } else {
        request.token =  null // may throw an execption when decoded
    }
    next()
}

const userExtractorHandler = (request, response, next) => {
    const { token } = request
    if (!token) {
        throw new Error('UserTokenMissingError')
    }
    const decodedDataPayload = jwt.verify(token, JWT_SECRET)
    if (!decodedDataPayload.id) {
        throw new Error('TokenInvalidError')
    }
    request.userData = decodedDataPayload
    next()
}

module.exports = {
    tokenExtractorHandler,
    userExtractorHandler
}
