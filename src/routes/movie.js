const router = require('express').Router()
const { dispatch } = require('../actionDispatcher');
const auth = require('../middlewares/auth');

const prefix = '/movies'

router.get('/', dispatch(getAllMovies));
router.get('/:id', dispatch(getMovieDetails));
router.post('/', auth, dispatch(addMovie)); // Protected route
router.delete('/:id', auth, dispatch(deleteMovie)); // Protected route

exports.routes = app => app.use(prefix, router)
