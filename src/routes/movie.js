const router = require('express').Router()
const { dispatch } = require('../actionDispatcher');
const { User } = require('../database/objection/models/User');
const auth = require('../middlewares/auth');
const { validationErrorInterceptor } = require('../middlewares/validationErrorsInterceptor');
const { addMovieValidator } = require('../validators/movieValidator');

const prefix = '/movies'

router.get('/', dispatch(getAllMovies));
router.get('/:id', dispatch(getMovieDetails));
router.post('/', auth, role(User.Roles.ADMIN), ...addMovieValidator, validationErrorInterceptor, dispatch(addMovie)); // Protected route
router.delete('/:id', auth, role(User.Roles.ADMIN), dispatch(deleteMovie)); // Protected route

exports.routes = app => app.use(prefix, router)
