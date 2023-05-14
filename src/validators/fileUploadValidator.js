const { check } =  require('express-validator');

exports.fileUploadValidator = [
    check('file', "Field: 'file' is required").notEmpty().bail()
]

