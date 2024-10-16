module.exports = {
    handleSequelizeErrors: require('./error/sequelizeErrors'),
    handleGenericErrors: require('./error/genericErrors'),
    handleNotFoundError: require('./error/notFoundError'),
    requestLogger: require('./logging/requestLogger'),
};