class AuthorizationError extends Error {
    statusCode = 401
    constructor(message = 'Authorization Error') {
        super(message)
        this.name = this.constructor.name
    }
}

exports.AuthorizationError = AuthorizationError