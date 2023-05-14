const rateLimit = require('express-rate-limit')
const RedisStore = require('rate-limit-redis')
const { ioRedisConn } = require('../redis');
const { errorResponse } = require('../utils/commonUtils');
const { rate_limit_window_in_minute, rate_limit_allowed_requests } = require('../../config/serverConfig');

exports.uploadLimiter = rateLimit({
    // Rate limiter configuration
    windowMs: parseInt(rate_limit_window_in_minute) * 60 * 1000, // configured minutes
    max: parseInt(rate_limit_allowed_requests), // Limit each IP to configured requests per `window` 
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: errorResponse([{'msg': 'Too many requests'}], 429),

    // Redis store configuration
    store: new RedisStore({
        sendCommand: (...args) => ioRedisConn.call(...args),
        prefix: 'file_server:upload_limit'
    }),
});

exports.downloadLimiter = rateLimit({
    // Rate limiter configuration
    windowMs: parseInt(rate_limit_window_in_minute) * 60 * 1000, // configured minutes
    max: parseInt(rate_limit_allowed_requests), // Limit each IP to configured requests per `window` 
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: errorResponse([{'msg': 'Too many requests'}], 429),

    // Redis store configuration
    store: new RedisStore({
        sendCommand: (...args) => ioRedisConn.call(...args),
        prefix: 'file_server:download_limit'
    }),
});