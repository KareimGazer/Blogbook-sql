const logger = require('../../utils/logger');

const javaScriptErrorsHandler = (err, req, res, next) => {
    if (err instanceof TypeError || err instanceof ReferenceError) {
        logger.error(err.message);
        return res.status(500).json({ message: 'Server encountered an internal error.' });
    }
    next(err);
};

const systemErrorsHandler = (err, req, res, next) => {
    if (err.name === 'OutOfMemoryError') {
        logger.error(err.message);
        return res.status(500).json({ message: 'Server ran out of memory.' });
    }
    next(err);
};


// the last resort
const genericErrorsHandler = (err, req, res, next) => {
    logger.error(err.stack);  // Log the error stack trace for debugging
    res.status(500).json({
        message: 'An unexpected error occurred.',
        error: err.message
    });
};

module.exports = {
    javaScriptErrorsHandler,
    systemErrorsHandler,
    genericErrorsHandler
}
