const { NODE_ENV, DATABASE_URL } = require('./utils/config')
const { Sequelize} = require('sequelize')

const express = require('express')
require('express-async-errors')
const app = express()

const cors = require('cors')

const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

const logger = require('./utils/logger')
logger.info('PostgreSQL DB: Connecting to', DATABASE_URL)

app.use(cors())
app.use(express.json())

if (NODE_ENV !== 'test') {
    app.use(middleware.requestLogger)
}

app.use('/api/blogs', blogsRouter)

app.use(middleware.castErrorHandler)
app.use(middleware.validationErrorHandler)
app.use(middleware.duplicateKeyErrorHandler)
app.use(middleware.JsonWebTokenErrorHandler)
app.use(middleware.TokenExpiredErrorHandler)
app.use(middleware.unknownEndPoint)


module.exports = app


