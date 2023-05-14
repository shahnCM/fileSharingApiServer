const { request: req, response: res, next: next } = require('express')
const { routes: fileRoutes } = require('./file')
const { handleError: handleRouteError } = require('../errors/handleError')

exports.initiateRoutes = async function initiateRoutes(app) {
    fileRoutes(app)         // File Routes
    handleRouteError(app)   // ErrorHandling
}
