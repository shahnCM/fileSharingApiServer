const { check } = require('express-validator');

exports.addMovieValidator = [
    check('title', "Field: 'title' is required").notEmpty().bail(),
    check('description', "Field: 'description' is required").notEmpty().bail(),
    check('running_time', "Field: 'running_time' is required").notEmpty().bail(),
    check('thumbnail_url', "Field: 'thumbnail_url' is required").notEmpty().bail().isURL().withMessage('Invalid URL format')
];
