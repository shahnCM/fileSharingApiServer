const { check } = require('express-validator');

exports.registerValidator = [
    check('username', "Field: 'username' is required").notEmpty().bail(),
    check('password', "Field: 'password' is required").notEmpty().bail()
];

exports.loginValidator = [
    check('username', "Field: 'username' is required").notEmpty().bail(),
    check('password', "Field: 'password' is required").notEmpty().bail()
];
