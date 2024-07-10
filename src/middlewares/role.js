// middlewares/roleMiddleware.js
const { User } = require('../models/userModel');
const { UnauthorizedError } = require('../errors/UnauthorizedError');
const { AuthorizationError } = require('../errors/AuthorizationError');

const role = (requiredRole) => {
    return (req, res, next) => {
        const { role } = req.user; // assuming req.user is set after authentication

        if (!role || role !== requiredRole) {
            return next(new AuthorizationError());
        }

        next();
    };
};

module.exports = roleMiddleware;
