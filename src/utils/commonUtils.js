// Locale Time (Asia/Dhaka)
exports.localeTime = timestamp => {
    if(timestamp) {
        return new Date(timestamp).toLocaleString('sv-SE', { timeZone: 'Asia/Dhaka' })
    }

    return new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Dhaka' })
}

// TimeStamp Unix In Seconds
exports.timestampUnix = timestring => {
    if(timestring) {
        return Math.floor((new Date(timestring).getTime()) / 1000)
    }

    return Math.floor((new Date().getTime()) / 1000)
}

// TimeStamp Unix In MiliSeconds
exports.timestamp = timestring => {
    if(timestring) {
        return new Date(timestring).getTime()
    }

    return new Date().getTime()
}

// Compare 2 strs in a case insensitive manner
exports.strEqualsCaseInSensitive = (str1, str2) => !Boolean(str1.localeCompare(str2, undefined, { sensitivity: 'accent' }))

// Higher Order Function for Simple *Function
exports.safeBackground = (fn, timeOut = 1) => (...params) => setTimeout(_ => fn(...params), timeOut)

// Higher Order Function for Simple *Promises
exports.safePromise = (fn) => (...params) => fn(...params).then((res) => console.log(`SafeResponse: ${res}`)).catch((err) => console.error(`Oops, ${err.msg}`))

// Success Response
exports.successResponse = (data = null, statusCode = 200) => {
    return {
        "statusCode": statusCode,
        "status": "SUCCESS",
        "data": data,
    }
}

// Error Response
exports.errorResponse = (errors = null, statusCode = 422) => {
    return {
        "statusCode": statusCode,
        "status": "ERROR",
        "errors": errors
    }
}
