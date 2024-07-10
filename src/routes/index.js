const { request: req, response: res, next: next } = require('express')
const { routes: fileRoutes } = require('./file')
const { routes: uesrRoutes } = require('./user')
const { routes: movieRoutes } = require('./movie')
const { routes: commentRoutes } = require('./comment')
const { routes: favoriteRoutes } = require('./favorite')
const { handleError: handleRouteError } = require('../errors/handleError')

exports.initiateRoutes = async function initiateRoutes(app) {
    fileRoutes(app)         // File Routes
    uesrRoutes(app)
    movieRoutes(app)
    commentRoutes(app)
    favoriteRoutes(app)

    handleRouteError(app)   // ErrorHandling
}
