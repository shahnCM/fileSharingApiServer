const { LOCAL } = require('../../enums/storageType')
const { save, findOneByPublicKeyAndIncrementDownloads, findAndDeleteOneByPrivateKey } = require('../repositories/fileRepository')
const { upload_folder_path } = require('../../config/multerConfig')

exports.saveFileInfo = async (fileInfo, keyPair) => {
    return save({
        storage: LOCAL,
        name: fileInfo.name,
        path: upload_folder_path,
        pub_key: keyPair.publicKey,
        pvt_key: keyPair.privateKey,
        mimetype: fileInfo.mimetype
    })
} 

exports.findFileInfo = async (publicKey) => {
    return await findOneByPublicKeyAndIncrementDownloads(publicKey)
}

exports.deleteFile = async (privateKey) => {
    return await findAndDeleteOneByPrivateKey(privateKey)
}
