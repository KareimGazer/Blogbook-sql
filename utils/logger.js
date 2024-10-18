const { NODE_ENV } = require('./config');
const winston = require('winston');
require('winston-daily-rotate-file');
const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, colorize } = format;

// Define log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

// Create logger with daily rotation and different levels
const logger = createLogger({
    level: 'info',  // Default log level (you can set this to 'warn' or 'error' in production)
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        // Error log file
        new transports.DailyRotateFile({
            filename: 'logs/%DATE%-error.log',
            datePattern: 'YYYY-MM-DD',
            level: 'error',  // Only log error level
            maxFiles: '14d'  // Keep logs for 14 days
        }),
        // Warning log file
        new transports.DailyRotateFile({
            filename: 'logs/%DATE%-warn.log',
            datePattern: 'YYYY-MM-DD',
            level: 'warn',  // Only log warn level
            maxFiles: '14d'  // Keep logs for 14 days
        }),
        // Combined log file (all levels from info and above)
        new transports.DailyRotateFile({
            filename: 'logs/%DATE%-combined.log',
            datePattern: 'YYYY-MM-DD',
            level: 'info',  // Log everything info level and above
            maxFiles: '14d'  // Keep logs for 14 days
        })
    ]
});

// Log to console in development
if (NODE_ENV === 'development') {
    logger.add(new transports.Console({
        format: combine(
            colorize(),  // Colorize the output for console
            timestamp(),
            logFormat
        ),
        level: 'debug',  // Log everything down to debug level in development
        stderrLevels: ['error'],  // Ensure 'error' level logs are shown on stderr
        handleExceptions: true  // Handle uncaught exceptions
    }));
}

module.exports = logger;
