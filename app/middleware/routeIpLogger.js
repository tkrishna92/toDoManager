const config = require('./../../config/appConfig');
const logger = require('./../libs/loggerLib');

// this is used to log the IP that is using the route
let routeIpLogger = (req, res, next)=>{
    let remoteIP = req.connection.remoteAddress +"://"+req.connection.remotePort;
    let realIP = req.headers['X-REAL-IP'];

    if(realIP){
        logger.info(`${req.method} method from ${realIP} for route ${req.originalUrl}`, "routeIpLogger", 5);

    }else {
        logger.info(`${req.method} method from ${remoteIP} for route ${req.originalUrl}`, "routeIpLogger", 5);
    }

    if(req.method === 'OPTIONS'){
        
        var headers = {};
        headers["Access-Control-Allow-Origin"]=req.headers.origin;
        headers["Access-Control-Allow-Origin"]="*";
        headers["Access-Control-Allow-Methods"]= "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Max-Age"]= '86400'
        headers["Access-Control-Allow-Headers"] = "X-Requested-with, X-HTTP-Method-Override, Content-Type, Accept";
        res.writeHead(200, headers);
        res.end();
    }
    else {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    }

}

module.exports = {
    routeIPLogger : routeIpLogger
}