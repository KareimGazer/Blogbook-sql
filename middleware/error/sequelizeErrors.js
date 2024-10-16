const logger = require('../../utils/logger');

const databaseErrorHandler = (err, req, res, next) => {
    if (err.name === 'SequelizeDatabaseError') {
        logger.error(err.message);
        return res.status(500).json({ message: 'Database error occurred.' });
    }
    next(err);
};

const connectionErrorHandler = (err, req, res, next) => {
    if (err.name === 'SequelizeConnectionError' || err.name === 'SequelizeConnectionRefusedError') {
        logger.error(err.message);
        return res.status(500).json({ message: 'Database connection failed.' });
    }
    next(err);
};

const timeoutErrorHandler = (err, req, res, next) => {
    if (err.name === 'SequelizeQueryTimeoutError' || err.name === 'SequelizeTimeoutError') {
        logger.error(err.message);
        return res.status(500).json({ message: 'Database query timed out.' });
    }
    next(err);
};

const validationErrorHandler = (err, req, res, next) => {
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeInvalidParameterError') {
        logger.error(err.message);
        return res.status(400).json({ message: 'Invalid request data.', errors: err.errors });
    }
    next(err);
};

const castErrorHandler = (err, req, res, next) => {
    if (err.name === 'CastError' || err.name === 'SequelizeInvalidParameterError') {
        logger.error(err.message);
        return res.status(400).json({ message: 'Invalid parameter format.' });
    }
    next(err);
};

const permissionErrorHandler = (err, req, res, next) => {
    if (err.name === 'PermissionError') {
        logger.error(err.message);
        return res.status(403).json({ message: 'Insufficient permissions to perform this operation.' });
    }
    next(err);
};


module.exports = {
    databaseErrorHandler,
    connectionErrorHandler,
    timeoutErrorHandler,
    validationErrorHandler,
    castErrorHandler,
    permissionErrorHandler
}
