const bcrypt = require('bcryptjs');
const logger = require('./loggerLib');
const saltRounds = 10;


// using synchronous hashing, as the process should not move further untill the password is hashed

let hashPassword = (inputPassword)=>{
    let salt = bcrypt.genSaltSync(saltRounds);
    let hashedPassword = bcrypt.hashSync(inputPassword, salt);
    return hashedPassword;
}

let comparePassword = (inputPassword, hashedSavedPassword, cb)=>{
    bcrypt.compare(inputPassword, hashedSavedPassword, (err, result)=>{
        if(err){
            logger.error("error comparing the password ", "generatePasswordLib - comparePassword", 9);
            cb(err, null);
        }else {
            cb(null, result);
        }
    })
}

let comparePasswordSync = (inputPassword, hashedSavedPassword)=>{
    let isMatch = bcrypt.compareSync(inputPassword, hashedSavedPassword);
    return isMatch;
}

module.exports = {
    generatePassword : hashPassword,
    comparePassword : comparePassword,
    comparePasswordSync : comparePasswordSync
}
