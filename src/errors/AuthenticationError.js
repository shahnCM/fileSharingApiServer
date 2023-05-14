class AuthenticationError extends Error {
    statusCode = 403
    constructor(message = 'Authentication Error') {
        super(message)
        this.name = this.constructor.name
    }
}

exports.AuthenticationError = AuthenticationError