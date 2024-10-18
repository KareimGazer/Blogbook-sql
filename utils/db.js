const { DATABASE_URL } = require('./config')
const logger = require('./logger')
const { Umzug, SequelizeStorage } = require('umzug')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(DATABASE_URL, { dialect: 'postgres' })


// The runMigrations function that performs migrations is now executed every time the application
// opens a database connection when it starts.
// Sequelize keeps track of which migrations have already been completed, 
// so if there are no new migrations, running the runMigrations function does nothing.
const runMigrations = async () => {
    const migrator = new Umzug({
        migrations: {
        glob: 'migrations/*.js',
        },
        storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
        context: sequelize.getQueryInterface(),
        logger: console, // logger: logger
    })
    
    const migrations = await migrator.up()
    logger.info('Migrations up to date', {
        files: migrations.map((mig) => mig.name),
    })
}

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        await runMigrations()
        logger.info('connected to the database')
    } catch (exception) {
        logger.info('failed to connect to the database')
        logger.error(exception)
        return process.exit(1)
    }
    return null
}

module.exports = { connectToDatabase, sequelize }