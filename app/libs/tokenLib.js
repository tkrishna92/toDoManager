const jwt = require('jsonwebtoken');
const shortId = require('shortid');
const secretKey = "toDoListHasARandomSecretKey";
const loggerLib = require('./loggerLib');

let generateToken = (data, cb)=>{
    try{
        let claims = {
            jwtid : shortId.generate(),
            iat : Date.now(),
            exp : (Math.floor(Date.now()/1000)+(60*60*24)),
            sub : 'authToken',
            iss : 'toDoManager',
            data : data
        }
        let tokenDetails = {
            token : jwt.sign(claims, secretKey),
            tokenSecret : secretKey
        }
        cb(null, tokenDetails);
    }catch(err){
        cb(err, null);
    }
}

let generateForgotPasswordToken = (data, cb)=>{
    try{
        let claims = {
            jwtid : shortId.generate(),
            iat : Date.now(),
            exp : (Math.floor(Date.now()/1000)+(30)),
            sub : 'authToken',
            iss : 'toDoManager',
            data : data
        }
        let tokenDetails = {
            token : jwt.sign(claims, secretKey),
            tokenSecret : secretKey
        }
        cb(null, tokenDetails);
    }catch(err){
        cb(err, null);
    }
}


let verify = (token, secretKey, cb)=>{
    jwt.verify(token, secretKey, (err, decoded)=>{
        if(err){
            loggerLib.error("error decoding the user token", "tokenLib : verify", 8);
            cb(err, null);
        }else{
            cb(null, decoded);
        }
    })
}

let verifyWithoutSecretKey = (token,cb)=>{
    jwt.verify(token, secretKey, (err, decoded)=>{
        if(err){
            loggerLib.error("error decoding the user token","tokenLib : verifyWithoutSecretKey", 9);
            cb(err, null);
        }else{
            cb(null, decoded);
        }
    })
}

module.exports = {
    generateToken : generateToken,
    generateForgotPasswordToken : generateForgotPasswordToken,
    verify : verify,
    verifyWithoutSecretKey : verifyWithoutSecretKey
}