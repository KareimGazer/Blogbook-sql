const logger = require('../../utils/logger');

const handleUserNotFoundError = (err, req, res, next) => {
    if (err.name === 'User NotFoundError') {
        logger.error(err.message);
        return res.status(404).json({ message: 'User not found' });
    }
    next(err);
};

const handleBlogNotFoundError = (err, req, res, next) => {
    if (err.name === 'BlogNotFoundError') {
        logger.error(err.message);
        return res.status(404).json({ message: 'Blog not found' });
    }
    next(err);
};

const handleNotFoundError = (err, req, res, next) => {
    if (err.name === 'NotFoundError') {
        logger.error(err.message);
        return res.status(404).json({ message: 'Resource not found' });
    }
    next(err);
};

module.exports = {
    handleUserNotFoundError,
    handleBlogNotFoundError,
    handleNotFoundError
}
