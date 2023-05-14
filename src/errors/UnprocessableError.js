class UnprocessableError extends Error {
    statusCode = 422
    constructor(message = 'Unprocessable Error') {
        super(message)
        this.name = this.constructor.name
    }
}

exports.UnprocessableError = UnprocessableError