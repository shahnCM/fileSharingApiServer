const cors = require('cors')
const express = require('express')
const {bootServer} = require('./server')
const {initiateRoutes} = require('./routes')
const {dbInit} = require('./database/objection/conn')
const { ioRedisConn, ioRedisConnCheck } = require('./redis')
const app = express()

// Exporting for tests
exports.appForTest = app

// Allows request from any IP
app.use(cors())

// Body parsing Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

console.log("BOOTING UP ...");
(async function () {
    // Check Redis Connection
    await ioRedisConnCheck(ioRedisConn)
    // Connect Database
    await dbInit()
    // Boot NodeJs Server
    await bootServer(app)
    // Initiate Routes
    await initiateRoutes(app)
})();