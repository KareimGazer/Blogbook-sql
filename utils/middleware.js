const logger = require('./logger')
const morgan = require("morgan")
// const jwt = require('jsonwebtoken')
// const { JWT_SECRET } = require('./config')

morgan.token('body', (req, res) => JSON.stringify(req.body));
const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

const castErrorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === 'CastError') {
        response.statusMessage = "Malformatted ID"
        return response.status(400).send({ error:  error.message})
    } 
    next(error)
}

const validationErrorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === 'ValidationError') {
        response.statusMessage = "Invalid Data"
        return response.status(400).send({ error: error.message })
    }
    next(error)
}

const duplicateKeyErrorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    }
    next(error)
}

const JsonWebTokenErrorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name ===  'JsonWebTokenError') {
        response.statusMessage = "Invalid Data"
        return response.status(400).send({ error: error.message })
    }
    next(error)
}

const TokenExpiredErrorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === 'TokenExpiredError') {
        return response.status(401).json({error: 'token expired'})
    }
    next(error)
}

const unknownEndPoint = (request, response, next) => {
    response.statusMessage = "Path Not found"
    response.status(404).send({ error: 'unknown endpoint' })
    next()
}

module.exports = {
    requestLogger,
    castErrorHandler,
    validationErrorHandler,
    duplicateKeyErrorHandler,
    JsonWebTokenErrorHandler,
    TokenExpiredErrorHandler,
    // tokenExtractor,
    // userExtractor,
    unknownEndPoint
}
