const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../config/server_config');
const { AuthenticationError } = require('../errors/AuthenticationError');

const auth = (req, res, next) => {
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
        req.user = decoded;
        next();
    } catch (err) {
        // res.status(401).json({ error: 'Invalid token' });
        return next(new AuthenticationError('Invalid token'));
    }
};

module.exports = auth;
