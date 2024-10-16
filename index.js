const { PORT, DATABASE_URL } = require('./utils/config')
const app = require('./app')
const logger = require('./utils/logger')
const { connectToDatabase } = require('./utils/db')

logger.info('PostgreSQL DB: Connecting to', DATABASE_URL)
const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`)
    })
}

start()
