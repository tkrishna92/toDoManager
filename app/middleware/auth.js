const loggerLib = require('./../libs/loggerLib');
const responseLib = require('../libs/responseLib');
const checkLib = require('./../libs/checkLib');
const token = require('./../libs/tokenLib');
const mongoose = require('mongoose');

const AuthModel = mongoose.model('Auth');


// to check if the authentication details have been passed in request
// and compares to those in the datebase
let isAuthenticated = (req, res, next)=>{
    
    console.log("checking for authentication");
    if(req.params.authToken || req.body.authToken || req.header('authToken') || req.query.authToken){
        // looking for authentication details with given authToken in DB
        AuthModel.findOne({authToken : req.params.authToken || req.body.authToken || req.header('authToken') || req.query.authToken}, (err, result)=>{
            if(err){
                loggerLib.error("error retreiving user authentication details", "middleware-auth : isAuthenticated", 9)
                let apiResponse = responseLib.generate(true, "error retreiving user's authentication details", 500, err);
                res.send(apiResponse);
            }else if(checkLib.isEmpty(result)){
                loggerLib.error("user's authentication details not found", "middleware-auth : isAuthenticated", 9)
                let apiResponse = responseLib.generate(true, "User's authentication details not found", 404, null);
                res.send(apiResponse);
            }else {
                token.verify(result.authToken, result.tokenSecret, (err, decoded)=>{
                    if(err){
                        loggerLib.error("error verifying user authentication details", "middleware-auth : isAuthenticated", 9)
                        let apiResponse = responseLib.generate(true, "error verifying user's authentication details", 500, err);
                        res.send(apiResponse);
                    }else{
                        // using the userId to forward to funtionality that require authentication for access
                        req.user = {userId : decoded.data.userId};
                        next();
                    }
                })
            }
        })
    }else{
        loggerLib.error("authentication details not provided", "middleware-auth : isAuthenticated", 9)
        let apiResponse = responseLib.generate(true, "authentication details not provided", 500, null);
        res.send(apiResponse);
    }
}

module.exports = {
    isAuthenticated : isAuthenticated
}