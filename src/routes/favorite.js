const router = require('express').Router()
const { dispatch } = require('../actionDispatcher');
const { markFavoriteValidator, unmarkFavoriteValidator } = require('../validators/favoriteValidator');

const prefix = '/favorites'

router.post('/', auth, ...markFavoriteValidator, validationErrorInterceptor, dispatch(markFavorite)); // Protected route
router.get('/', auth, dispatch(getFavorites)); // Protected route
router.delete('/', auth, ...unmarkFavoriteValidator, validationErrorInterceptor, dispatch(unmarkFavorite)); // Protected route

exports.routes = app => app.use(prefix, router)
