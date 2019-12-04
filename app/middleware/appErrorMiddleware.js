const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');

// used to handle errors at app level 
let appGlobalErrorHandler = (err, req, res, next)=>{
    if(err){
        logger.error("error occurred at app level","appErrorMiddleWare", 10);
        let apiResponse = response.generate(true, "error occurred at app level", 500, err);
        res.send(apiResponse);
    }
}

let routeNotFoundHandler = (req, res, next)=>{
    
        logger.error("route not found error occurred at app level","appErrorMiddleWare", 10);
        let apiResponse = response.generate(true, "no such route available", 404, err);
        res.send(apiResponse);
}

module.exports = {
    appGlobalErrorHandler : appGlobalErrorHandler,
    routeNotFoundHandler : routeNotFoundHandler
}