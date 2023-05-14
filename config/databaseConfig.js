const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    sql_client: process.env.SQL_CLIENT ?? 'mysql2',
    mysql_host: process.env.MYSQL_HOST,
    mysql_port: process.env.MYSQL_PORT,
    mysql_user: process.env.MYSQL_USER,
    mysql_pass: process.env.MYSQL_PASSWORD,
    mysql_db_name: process.env.MYSQL_DATABASE,
    redis_host: process.env.REDIS_HOST,
    redis_port: process.env.REDIS_PORT,
    redis_pass: process.env.REDIS_PASS,
};