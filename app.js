const { NODE_ENV } = require('./utils/config')

const express = require('express')
require('express-async-errors')
const app = express()

const cors = require('cors')

const blogsRouter = require('./controllers/blogs')
const {
    databaseErrorHandler,
    connectionErrorHandler,
    timeoutErrorHandler,
    validationErrorHandler,
    castErrorHandler,
    permissionErrorHandler
} = require('./middleware/error/sequelizeErrors')
const {javaScriptErrorsHandler, systemErrorsHandler, genericErrorsHandler} = require('./middleware/error/genericErrors')
const { handleNotFoundError } = require('./middleware/error/notFoundError')


app.use(cors())
app.use(express.json())

if (NODE_ENV === 'development') app.use(requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(databaseErrorHandler)
app.use(connectionErrorHandler)
app.use(timeoutErrorHandler)
app.use(validationErrorHandler)
app.use(castErrorHandler)
app.use(permissionErrorHandler)
app.use(javaScriptErrorsHandler)
app.use(systemErrorsHandler)
app.use(genericErrorsHandler)
app.use(handleNotFoundError)

module.exports = app
