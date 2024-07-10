const router = require('express').Router()
const favoriteController = require('../controllers/favoriteController')
const { dispatch } = require('../actionDispatcher');
const { markFavoriteValidator, unmarkFavoriteValidator } = require('../validators/favoriteValidator');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const { validationErrorInterceptor } = require('../middlewares/validationErrorsInterceptor');

const prefix = '/favorites'

router.post('/', auth, ...markFavoriteValidator, validationErrorInterceptor, dispatch(favoriteController.markFavorite)); // Protected route
router.get('/', auth, dispatch(favoriteController.getFavorites)); // Protected route
router.delete('/', auth, ...unmarkFavoriteValidator, validationErrorInterceptor, dispatch(favoriteController.unmarkFavorite)); // Protected route

exports.routes = app => app.use(prefix, router)
