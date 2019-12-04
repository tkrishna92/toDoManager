let generate = (err, message, status, data)=>{
    let response = {
        errorOccured : err,
        message : message,
        status : status,
        data : data
    }
    return response;
}

module.exports = {
    generate : generate
}