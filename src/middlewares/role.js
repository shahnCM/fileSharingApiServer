// middlewares/roleMiddleware.js
const { AuthorizationError } = require('../errors/AuthorizationError');
const { User } = require('../database/objection/models/User');

const role = (requiredRole) => {
    return (req, res, next) => {
        const { role } = req.user; // assuming req.user is set after authentication

        if (!role || role !== requiredRole) {
            return next(new AuthorizationError());
        }

        next();
    };
};

module.exports = role;
