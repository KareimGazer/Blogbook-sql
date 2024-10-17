module.exports = {
    handleSequelizeErrors: require('./error/sequelizeErrors'),
    handleGenericErrors: require('./error/genericErrors'),
    handleNotFoundErrors: require('./error/notFoundError'),
    haddleAuthErrors: require('./error/authErrors'),
    handelAuthentication: require('./auth/authenticate'),
    requestLogger: require('./logging/requestLogger')
};