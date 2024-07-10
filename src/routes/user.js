const router = require('express').Router()
const userController = require('../controllers/userController')
const { dispatch } = require('../actionDispatcher');
const { validationErrorInterceptor } = require('../middlewares/validationErrorsInterceptor');
const { registerValidator, loginValidator } = require('../validators/userValidator');

const prefix = '/users'

router.post('/register', ...registerValidator, validationErrorInterceptor, dispatch(userController.register));
router.post('/login', ...loginValidator, validationErrorInterceptor, dispatch(userController.login));

exports.routes = app => app.use(prefix, router)
