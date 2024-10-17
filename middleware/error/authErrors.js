const logger = require('../../utils/logger');

const JsonWebTokenErrorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name ===  'JsonWebTokenError') {
        return response.status(401).send({ error: 'Token Missing' })
    }
    next(error)
}

// probably redundant
const UserTokenMissingErrorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name ===  'UserTokenMissingError') {
        return response.status(401).send({ error: 'User Token Missing' })
    }
    next(error)
}

const weekPasswordErrorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name ===  'WeekPasswordError') {
        return response.status(400).send({ error: 'Password must contain at least one uppercase letter, one lowercase letter, one digit and one special character.' })
    }
    next(error)
}

const TokenInvalidErrorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name ===  'TokenInvalidError') {
        return response.status(401).send({ error: 'Token Invalid' })
    }
    next(error)
}

const TokenExpiredErrorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === 'TokenExpiredError') {
        return response.status(401).json({error: 'Token Expired'})
    }
    next(error)
}

const InvalidUserErrorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === 'InvalidUsernameOrPassword') {
        return response.status(401).json({error: 'Invalid Username Or Password'})
    }
    next(error)
}

module.exports = {
    JsonWebTokenErrorHandler,
    TokenInvalidErrorHandler,
    UserTokenMissingErrorHandler,
    weekPasswordErrorHandler,
    TokenExpiredErrorHandler,
    InvalidUserErrorHandler
}