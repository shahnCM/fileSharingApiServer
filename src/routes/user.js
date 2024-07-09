const router = require('express').Router()
const { dispatch } = require('../actionDispatcher')

const prefix = '/users'

router.post('/register', dispatch(register));
router.post('/login', dispatch(login));

exports.routes = app => app.use(prefix, router)
