const router = require('express').Router()
const movieController = require('../controllers/movieController')
const { dispatch } = require('../actionDispatcher');
const auth = require('../middlewares/auth');
const { validationErrorInterceptor } = require('../middlewares/validationErrorsInterceptor');
const { addMovieValidator } = require('../validators/movieValidator');
const role = require('../middlewares/role');
const userType = require('../../enums/userType');

const prefix = '/movies'

router.get('/', dispatch(movieController.getAllMovies));
router.get('/:id', dispatch(movieController.getMovieDetails));
router.post('/', auth, role(userType.ADMIN), ...addMovieValidator, validationErrorInterceptor, dispatch(movieController.addMovie)); // Protected route
router.delete('/:id', auth, role(userType.ADMIN), dispatch(movieController.deleteMovie)); // Protected route

exports.routes = app => app.use(prefix, router)
