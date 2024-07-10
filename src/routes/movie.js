const router = require('express').Router()
const movieController = require('../controllers/movieController')
const { dispatch } = require('../actionDispatcher');
const { User } = require('../database/objection/models/User');
const auth = require('../middlewares/auth');
const { validationErrorInterceptor } = require('../middlewares/validationErrorsInterceptor');
const { addMovieValidator } = require('../validators/movieValidator');
const role = require('../middlewares/role');

const prefix = '/movies'

router.get('/', dispatch(movieController.getAllMovies));
router.get('/:id', dispatch(movieController.getMovieDetails));
router.post('/', auth, role('ADMIN'), ...addMovieValidator, validationErrorInterceptor, dispatch(movieController.addMovie)); // Protected route
router.delete('/:id', auth, role('ADMIN'), dispatch(movieController.deleteMovie)); // Protected route

exports.routes = app => app.use(prefix, router)
