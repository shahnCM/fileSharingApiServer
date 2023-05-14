const multer = require("multer")

class UploadError extends Error {
    statusCode = 422
    constructor(message = 'Upload Error') {
        super(message)
        this.name = this.constructor.name
    }
}

exports.UploadError = UploadError