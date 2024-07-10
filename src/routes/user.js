const router = require('express').Router()
const { dispatch } = require('../actionDispatcher');
const { validationErrorInterceptor } = require('../middlewares/validationErrorsInterceptor');
const { registerValidator, loginValidator } = require('../validators/userValidator');

const prefix = '/users'

router.post('/register', ...registerValidator, validationErrorInterceptor, dispatch(register));
router.post('/login', ...loginValidator, validationErrorInterceptor, dispatch(login));

exports.routes = app => app.use(prefix, router)
