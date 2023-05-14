const router = require('express').Router()
const fileController = require('../controllers/fileController')
const { fileUploadValidator } = require('../validators/fileUploadValidator')
const { validationErrorInterceptor } = require('../middlewares/validationErrorsInterceptor')
const { upload } = require('../packageSettings/multer/settings')
const { dispatch } = require('../actionDispatcher')
const { uploadLimiter, downloadLimiter } = require('../middlewares/rateLimiter')

const prefix = '/files'

router.post('/', uploadLimiter, upload.fields([{name: 'file', maxCount: 1}]), ...fileUploadValidator, validationErrorInterceptor, dispatch(fileController.store))
router.get('/:publicKey', downloadLimiter, dispatch(fileController.show))
router.delete('/:privateKey', dispatch(fileController.destroy))


exports.routes = app => app.use(prefix, router)
