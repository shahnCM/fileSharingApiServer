const { registerUser, loginUser } = require('../services/userService');
const { successResponse } = require('../utils/commonUtils');

exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await registerUser(username, password);
        const response = successResponse(user);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const { token } = await loginUser(username, password);
        const response = successResponse({ token });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
