const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { NotFoundError } = require('../errors/NotFoundError');
const config = require('../config/server_config');

const registerUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 8);

    try {
        const user = await User.query().insert({
            username,
            password: hashedPassword
        });

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const loginUser = async (username, password) => {
    try {
        const user = await User.query().findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new NotFoundError('Invalid credentials');
        }

        const token = jwt.sign({ id: user.id, role: user.role }, config.jwt_secret, { expiresIn: '1h' });
        return { token };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { registerUser, loginUser };
