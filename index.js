const express = require('express');

const http = require('http');

const path = require('path');

const fs = require('fs');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const helmet = require('helmet');

const appConfig = require('./config/appConfig');

const appErrorHandler = require('./app/middleware/appErrorMiddleware');

const routeIPLogger = require('./app/middleware/routeIpLogger');

const logger = require('./app/libs/loggerLib');

const app = express();

//using required modules and middlewares at app level

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());
app.use(helmet());
app.use(appErrorHandler.appGlobalErrorHandler);
app.use(routeIPLogger.routeIPLogger);


app.use(express.static(path.join(__dirname, 'client'))) //used for dev level testing

// completed middleware and required module application


//bootstrapping the app

// model 
let modelPath = "./app/model";
fs.readdirSync(modelPath).forEach(function(file){
    if(~file.indexOf('.js')) require(modelPath+'/'+file);
})

// route
let routePath = "./app/route";
fs.readdirSync(routePath).forEach((file)=>{
    if(~file.indexOf('.js')){
        let route = require(routePath+'/'+file);
        route.setRouter(app);
    }
})

// completed bootstrapping


//initiating app

const server = http.createServer(app);
server.listen(appConfig);
server.on('error', onError);
server.on('listening', onListening);

const socketLib = require('./app/libs/socketLib');
// const socketServer = socketLib.setServer(server);

function onError(error){
    if(error.syscall !== 'listen'){
        logger.error(error.code+' : not equal to listen', "severOnErrorHandler", 10);
        throw error;
    }

    switch(error.code){
        case 'EACCES':
            logger.error(error.code+' : elevated privilages required', "severOnErrorHandler", 10);
            break;
        case 'EADDRINUSE':
            logger.error(error.code+' : port already in use', "severOnErrorHandler", 10);
            break;
        default :
            logger.error(error.code+' : unknown error occurred ', "severOnErrorHandler", 10);
            throw error;
    }
}


// on listening this logs the listening port info and then connects to database
function onListening(){
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
        ('listening on '+ bind)
        logger.info('server listening on port : ' + addr.port, "serverOnListeningHandler", 1);
        let db = mongoose.connect(appConfig.db.uri, {useUnifiedTopology: true})
}

process.on('unhandledRejection', (reason, p)=>{
    logger.error("unhandled rejection at promise : "+p + " reason : "+reason, "Applevel - unhandled exception handler", 9);
})


// mongoDB connection error handler
mongoose.connection.on('error', (err)=>{
    console.log("mongoDB connection failure");
    logger.error("mongoDB connection failure", "mongoose error handler - app level", 10);
})

// mongoDB connection on success handler
mongoose.connection.on('open', (err)=>{
    if(err){
        console.log("error in connecting to DB");
        logger.error("error in connecting to DB", "mongoose connection success handler", 9);
    }else{
        console.log("connection to mongodb success");
        logger.info("connection to mongodb success", "mongoDB connection success handler");
    }
})