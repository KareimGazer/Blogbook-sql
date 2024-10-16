const logger = require('../../utils/logger');

const handleNotFoundError = (err, req, res, next) => {
    if (err.name === 'NotFoundError') {
        logger.error(err.message);
        return res.status(404).json({ message: 'Resource not found.' });
    }
    next(err);
};

module.exports = { handleNotFoundError }