const router = require('express').Router()
const { dispatch } = require('../actionDispatcher')

const prefix = '/comments'

router.post('/', auth, dispatch(addComment)); // Protected route
router.delete('/:id', auth, dispatch(deleteComment)); // Protected route

exports.routes = app => app.use(prefix, router)
