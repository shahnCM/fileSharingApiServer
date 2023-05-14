exports.keepAlive = function keepAlive(app) {

    process.on('unhandledRejection', (err, p) => {
        console.error({
            message: "=== UNHANDLED REJECTION ===",
            stacktrace: err,
        })

        throw err
    })
    
    process.on('uncaughtException', (err, p) => {
        console.error({
            message: "=== UNCAUGHT EXCEPTION ===",
            stacktrace: err
        })
    })
}