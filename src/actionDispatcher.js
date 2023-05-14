const { request: req, response: res, next } = require('express')
exports.dispatch = 
    (action) =>
        async (req, res, next) =>
            await action(req, res, next).catch(next) 
