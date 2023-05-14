const { validationResult } = require('express-validator')
const { ValidationError } = require('../errors/ValidationError')

exports.validationErrorInterceptor = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.array().length === 0) {
      return next()
    }

    return next(new ValidationError('Validation Error', errors.array()))
}

