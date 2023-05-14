const IoRedis = require('ioredis');
const { redis_host, redis_port, redis_pass } = require('../config/databaseConfig')

exports.ioRedisConn = new IoRedis(parseInt(redis_port), redis_host, {
    host: redis_host,
    port: redis_port,
    lazyConnect: false,
    maxRetriesPerRequest: null
})

exports.ioRedisConnCheck = async (conn) => {
    conn.on('connect', _ => console.log('\tRedis connection succesful'))
    conn.on('error', err => console.log('\tRedis connection error ', err))
} 