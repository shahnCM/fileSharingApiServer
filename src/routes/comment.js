const router = require('express').Router()
const commentController = require('../controllers/commentController')
const { dispatch } = require('../actionDispatcher');
const { validationErrorInterceptor } = require('../middlewares/validationErrorsInterceptor');
const { addCommentValidator } = require('../validators/commentValidator');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const userType = require('../../enums/userType');

const prefix = '/comments'

router.post('/', auth, ...addCommentValidator, validationErrorInterceptor, dispatch(commentController.addComment)); // Protected route
router.delete('/:id', auth, role(userType.ADMIN), dispatch(commentController.deleteComment)); // Protected route

exports.routes = app => app.use(prefix, router)
