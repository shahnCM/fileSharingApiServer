const { File } = require('../database/objection/models/File')

exports.save = async (data) => {
    return await File.query().insert(data)
}

exports.findOneByName = async (name) => {
    return await File.query().select('updated_at').findOne('name', name)
}

exports.deleteOneByName = async (name) => {
    File.query().delete().where('name', name).catch(err => console.log(err))
}

exports.findOneByPublicKeyAndIncrementDownloads = async (publicKey) => {
    const fileInfo = await File.query().select('id', 'name', 'path', 'mimetype', 'downloads').findOne('pub_key', publicKey)

    if(fileInfo) {
        File.query().findById(fileInfo.id).update({ downloads: ++fileInfo['downloads'] }).catch(err => console.log(err))
    }
    
    return fileInfo
}

exports.findAndDeleteOneByPrivateKey = async (privateKey) => {
    const fileInfo = await File.query().select('name', 'path').findOne('pvt_key', privateKey)
    const deleted = await File.query().delete().where('pvt_key', privateKey)

    return {fileInfo, deleted}
}