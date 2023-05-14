class ValidationError extends Error {
    statusCode = 400
    errors = []
    constructor(message = 'Validation Error', errors = []) {
        super(message)
        this.name = this.constructor.name
        this.errors = errors
    }
}

exports.ValidationError = ValidationError