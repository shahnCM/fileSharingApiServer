const multer = require('multer')
const {UploadError} = require('./UploadError')
const {NotFoundError} = require('./NotFoundError')
const { debug } = require('../../config/serverConfig')
const {ValidationError} = require('./ValidationError')
const {AuthenticationError} = require('./AuthenticationError')
const {AuthorizationError} = require('./AuthorizationError')
const {errorResponse, strEqualsCaseInSensitive} = require('../utils/commonUtils')
const { UnprocessableError } = require('./UnprocessableError')
const { DBError: objectionOrmDbError} = require('db-errors');


const showStackTrace = err => strEqualsCaseInSensitive(debug, 'true') ? {stackTrace: err.stack} : null

exports.handleError = function handleError(app) {

    // Handle 404
    app.use((req, res, next) => next(new NotFoundError(`Requested URL was not found!`)))

    // Handle All Error
    app.use((err, req, res, next) => {

        if (res.headersSent) {
            return next('There was an unhandled error!')
        }

        if (err) {

            if (err instanceof multer.MulterError || err instanceof UploadError) {
                err.statusCode = err.statusCode || 422
                err.message = err.message || 'There was error while uploading file'
                let response = errorResponse([{msg: err.message, ...showStackTrace(err)}], err.statusCode)

                return res.status(err.statusCode).send(response)
            }

            if (err instanceof objectionOrmDbError) {
                err.statusCode = 500
                err.message = 'Database Error'
                let response = errorResponse([{msg: err.message, ...showStackTrace(err)}], err.statusCode)
                return res.status(err.statusCode).send(response)
            }

            if (err instanceof ValidationError) {
                let response = errorResponse(err.errors, err.statusCode)
                return res.status(err.statusCode).send(response)
            }

            if (err instanceof NotFoundError) {
                let response = errorResponse([{msg: err.message, ...showStackTrace(err)}], err.statusCode)
                return res.status(err.statusCode).send(response)
            }

            if (err instanceof AuthenticationError) {
                let response = errorResponse([{msg: err.message, ...showStackTrace(err)}], err.statusCode)
                return res.status(err.statusCode).send(response)
            }

            if (err instanceof AuthorizationError) {
                let response = errorResponse([{msg: err.message, ...showStackTrace(err)}], err.statusCode)
                return res.status(err.statusCode).send(response)
            }

            if (err instanceof UnprocessableError) {
                let response = errorResponse([{msg: err.message, ...showStackTrace(err)}], err.statusCode)
                return res.status(err.statusCode).send(response)
            }
        }
        
        // console.error(err.stack)
        let response = errorResponse([{msg: 'Internal Server Error', ...showStackTrace(err)}], 500)
        return res.status(500).send(response)
    })
}
