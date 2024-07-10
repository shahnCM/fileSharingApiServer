// server_config.js
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    debug: process.env.DEBUG,
    port: process.env.APP_PORT,
    storage: process.env.PROVIDER ?? 'local',
    file_clean_up_interval: process.env.FILE_CLEAN_UP_INTERVAL,
    rate_limit_window_in_minute: process.env.RATE_LIMIT_WINDOW_IN_MINUTE,
    rate_limit_allowed_requests: process.env.RATE_LIMIT_ALLOWED_REQUESTS,
    file_max_inactive_time: process.env.FILE_MAX_INACTIVE_TIME,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN
};