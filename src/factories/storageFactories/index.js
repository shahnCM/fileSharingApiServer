const { storage } = require('../../../config/serverConfig')
const { LOCAL, GCP } = require('../../../enums/storageType')
const localStorageService = require('./localStorageService')
const gcpStorageService = require('./gcpStorageService')

exports.storageServiceFactory = (currentStorage = storage) => {
    switch(currentStorage) {
        case LOCAL:
          return localStorageService.storageService
        case GCP:
          return gcpStorageService.storageService
        default:
          return localStorageService.storageService
    }
}