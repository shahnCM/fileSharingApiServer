const router = require('express').Router()
const { dispatch } = require('../actionDispatcher');
const { User } = require('../database/objection/models/User');
const { validationErrorInterceptor } = require('../middlewares/validationErrorsInterceptor');
const { addCommentValidator } = require('../validators/commentValidator');

const prefix = '/comments'

router.post('/', auth, ...addCommentValidator, validationErrorInterceptor, dispatch(addComment)); // Protected route
router.delete('/:id', auth, role(User.Roles.ADMIN), dispatch(deleteComment)); // Protected route

exports.routes = app => app.use(prefix, router)
