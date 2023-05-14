const { successResponse } = require('../utils/commonUtils')
const { generateKeyPair } = require('../services/keyService')
const { storageServiceFactory } = require('../factories/storageFactories')
const { findFileInfo, saveFileInfo, deleteFile } = require('../services/fileService')
const { NotFoundError } = require('../errors/NotFoundError')
const { dispatchFileCleanUpJob } = require('../jobs/fileCleanUpJob')
const { storage } = require('../../config/serverConfig')

exports.store = async (req, res) => {
    const storageService = storageServiceFactory(storage)
    const keyPair = generateKeyPair()
    saveFileInfo(req.body.file, keyPair)
        .then((fileInfo) => {
            storageService.saveFile(fileInfo)
            dispatchFileCleanUpJob({
                name: fileInfo.name,
                path: fileInfo.path,
                storage: fileInfo.storage
            })
        })
        
    const response = successResponse(keyPair)
    return res.status(200).json(response)
}

exports.show = async (req, res) => {
    const fileInfo = await findFileInfo(req.params.publicKey)

    if(!fileInfo) {
        throw new NotFoundError('Requestd File not found')
    }

    const storageService = storageServiceFactory(fileInfo.storage)
    const filePath = await storageService.getFile(fileInfo)

    return res.status(200).download(filePath, fileInfo.name)
}

exports.destroy = async (req, res) => {
    const { fileInfo, deleted } = await deleteFile(req.params.privateKey)
    
    if(!fileInfo) {
        throw new NotFoundError('Requestd File not found')
    }

    const storageService = storageServiceFactory(fileInfo.storage)
    storageService.deleteFile(fileInfo)

    const response = successResponse({ deleted })
    return res.status(200).send(response)
}