//used for standardizing the log 

const logger = require('pino')();
const moment = require('moment');

// used for standardizing error log

let errorLogger = (errorMessage, errorOrigin, errorImportance)=>{
    let time = moment().format();

    let errorResponse = {
        timeStamp : time,
        message : errorMessage,
        origin : errorOrigin,
        importance : errorImportance
    }
    logger.error(errorResponse);
    return errorResponse;

}

// used for standardizing information log

let infoLogger = (message, origin, importance)=>{
    let time = moment().format();
    let infoResponse = {
        timeStamp : time,
        message : message,
        origin : origin,
        importance : importance
    }

    logger.info(infoResponse);
    return infoResponse;
}

module.exports = {
    error : errorLogger,
    info : infoLogger
}