const { keepAlive } = require('./keepAlive')
const { port } = require('../config/serverConfig')

exports.bootServer = async function bootServer(app) {

    // Prevent Crash
    keepAlive(app)

    try {
        // Boot Server
        app.listen(port, () => {
            console.log(`\tServer running successfully on port ${port}`)
        });

    } catch (error) {
        console.error(`\tError Occurred: ${error.message}`)
    }
}