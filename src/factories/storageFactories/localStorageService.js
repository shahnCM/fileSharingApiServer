const fs = require('fs')
const path = require('path')
const { upload_folder_path } = require('../../../config/multerConfig')
const { NotFoundError } = require('../../errors/NotFoundError')

exports.storageService = {
    getFile: async function(fileInfo) {
        const filePath = path.join(fileInfo.path, fileInfo.name)
        if (!fs.existsSync(filePath)){
            throw new NotFoundError('Local storage does not contain requested file')
        }

        return filePath
    },

    saveFile: async function(fileInfo) {
        const filePath = path.join(fileInfo.path, fileInfo.name)
        fs.exists(filePath, exists => {
            if (!exists) console.log('\tUpload Failed')
        })
    },

    deleteFile: async function(fileInfo) {
        const filePath = path.join(fileInfo.path, fileInfo.name)
        fs.unlink(filePath, (err) => {
            if (err) console.log('\tDelete from storage failed')
        });
    }
}