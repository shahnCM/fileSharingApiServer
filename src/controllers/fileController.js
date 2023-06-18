const fs = require('fs');
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

    // Create a readable stream
    const fileStream = fs.createReadStream(filePath)

    // Set appropriate headers
    res.setHeader('Content-Disposition', `attachment; filename="${fileInfo.name}"`)
    res.type(fileInfo.mimetype)

    // Pipe the file stream to the response stream
    fileStream.pipe(res)

    fileStream.on('error', (err) => {
        console.log('Error streaming / downloading file:', err)
        throw new Error('Error streaming / downloading file')
    })
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