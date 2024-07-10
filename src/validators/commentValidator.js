const { check } = require('express-validator');

exports.addCommentValidator = [
    check('movie_id', "Field: 'movie_id' is required").notEmpty().bail(),
    check('comment', "Field: 'comment' is required").notEmpty().bail()
];
