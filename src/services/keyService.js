const { UnprocessableError } = require('../errors/UnprocessableError')
const { generateKeyPairSync } = require('crypto')

exports.generateKeyPair = _ => {
        // Options for key generation
        const options = {
            namedCurve: 'secp256k1',   // Options
            publicKeyEncoding: {
              type: 'spki',
              format: 'der'
            },
            privateKeyEncoding: {
              type: 'pkcs8',
              format: 'der'
            }
        }
    
        // Generate keyPair
        const keyPair = generateKeyPairSync('ec', options);
        
        return {
            publicKey: keyPair.publicKey.toString('hex'),
            privateKey: keyPair.privateKey.toString('hex')
        }
}

exports.verifyKeyPair = (keyPair) => {

    if(!('publicKey' in keyPair) || !('privateKey' in keyPair)) {
        throw new NotFoundError('File can not be found without key')
    }

    const { pubKey , pvtKey } = keyPair
    
    // code 
}