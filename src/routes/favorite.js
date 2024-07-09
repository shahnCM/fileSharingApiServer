const router = require('express').Router()
const { dispatch } = require('../actionDispatcher')

const prefix = '/favorites'

router.post('/', auth, dispatch(markFavorite)); // Protected route
router.get('/', auth, dispatch(getFavorites)); // Protected route
router.delete('/', auth, dispatch(unmarkFavorite)); // Protected route

exports.routes = app => app.use(prefix, router)
