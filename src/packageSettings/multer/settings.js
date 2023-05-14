const fs = require('fs')
const path = require('path')
const multer = require('multer')
const { upload_folder_path } = require('../../../config/multerConfig')
const { UploadError } = require('../../errors/UploadError')
const { monotonicFactory } = require('ulid')
const uploadsDir = `${upload_folder_path}`
const ulid = monotonicFactory()

// define the storage
storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(uploadsDir)){
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname)

        if(fileExt === "") {
            cb(new UploadError('Upload not allowed without file extension'), false)
        }

        const contentLength = req.headers['content-length']
        
        const fileName = file
            .originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") 
            +"-" 
            +ulid(Date.now())
            +fileExt

        req.body.file = {
            "name": fileName,
            "mimetype": file.mimetype,
            "encoding": file.encoding,
            "size": contentLength,
        }        

        cb(null, fileName)
    },
})

// preapre the final multer upload object
exports.upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {

        if (file.fieldname === "file") {
            if (
                file.mimetype === "image/png" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg"||
                true 
            ) {
                cb(null, true)
            } else {
                cb(new UploadError('Only JPG / JPEG / PNG is allowed'), false)
            }
        } else {
            cb(new UploadError('Please check field name for file'), false)
        }
    }
})