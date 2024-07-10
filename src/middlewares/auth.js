const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../../config/serverConfig');
const { AuthenticationError } = require('../errors/AuthenticationError');
const { User } = require('../database/objection/models/User');

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    // Removing Bearer
    const parts = authHeader.split(' ');

    const bearer = parts[0]
    if(bearer !== 'Bearer') {
        return res.status(401).json({ error: 'Token format invalid' });
    }

    const token = parts[1]
    if (!token) {
        return res.status(401).json({ error: 'Token is missing' });
    }

    try {
        const decoded = jwt.verify(token, jwt_secret);
        const user = await User.query().findById(decoded.id);

        if (!user) {
            return next(new AuthenticationError('Invalid token'));
        }

        req.user = user;
        next();

    } catch (err) {
        // res.status(401).json({ error: 'Invalid token' });
        return next(new AuthenticationError('Invalid token'));
    }
};

module.exports = auth;
