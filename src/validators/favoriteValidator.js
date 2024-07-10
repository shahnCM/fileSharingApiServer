const { check } = require('express-validator');

exports.markFavoriteValidator = [
    check('movie_id', "Field: 'movie_id' is required").notEmpty().bail()
];

exports.unmarkFavoriteValidator = [
    check('movie_id', "Field: 'movie_id' is required").notEmpty().bail()
];
