const { NODE_ENV } = require('./utils/config')

const express = require('express')
require('express-async-errors')
const app = express()

const cors = require('cors')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/authors')

const {
    handleSequelizeErrors,
    handleGenericErrors,
    handleNotFoundErrors,
    haddleAuthErrors,
    handelAuthentication,
    requestLogger,
} = require('./middleware')


app.use(cors())
app.use(express.json())

if (NODE_ENV === 'development') app.use(requestLogger)

app.use('/api/blogs', handelAuthentication.tokenExtractorHandler, blogsRouter)
app.use('/api/users', handelAuthentication.tokenExtractorHandler, usersRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/login', loginRouter)

// error handling
app.use(haddleAuthErrors.JsonWebTokenErrorHandler)
app.use(haddleAuthErrors.TokenExpiredErrorHandler)
app.use(haddleAuthErrors.TokenInvalidErrorHandler)
app.use(haddleAuthErrors.UserTokenMissingErrorHandler)
app.use(haddleAuthErrors.weekPasswordErrorHandler)
app.use(haddleAuthErrors.InvalidUserErrorHandler)
app.use(haddleAuthErrors.NotAuthorizedErrorHandler)

app.use(handleSequelizeErrors.databaseErrorHandler)
app.use(handleSequelizeErrors.castErrorHandler)
app.use(handleSequelizeErrors.connectionErrorHandler)
app.use(handleSequelizeErrors.validationErrorHandler)
app.use(handleSequelizeErrors.permissionErrorHandler)
app.use(handleSequelizeErrors.timeoutErrorHandler)

app.use(handleGenericErrors.javaScriptErrorsHandler)
app.use(handleGenericErrors.systemErrorsHandler)
app.use(handleGenericErrors.genericErrorsHandler)

app.use(handleNotFoundErrors.handleUserNotFoundError)
app.use(handleNotFoundErrors.handleBlogNotFoundError)
app.use(handleNotFoundErrors.handleNotFoundError)

module.exports = app
