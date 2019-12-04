const express = require('express');
const check = require('./../libs/checkLib');
const generatePassword = require('../libs/generatePasswordLib');
const validateInput = require('../libs/validateInputLib');
const response = require('../libs/responseLib');
const token = require('../libs/tokenLib');
const time = require('../libs/timeLib');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('../libs/loggerLib');

const userModel = mongoose.model('User');
const authModel = mongoose.model('Auth');

// new user signup function
let signup = (req, res) => {

    console.log("userController - signup called")

    // first the user input is validated to see if it meets the requirement
    let validateInputParams = () => {
        console.log("userController - signup - validatedInput called")

        return new Promise((resolve, reject) => {
            if (req.body.email) {
                console.log("email -id - present");
                if (!validateInput.Email(req.body.email)) {

                    logger.error("email Id not meeting the requirement standard", "userController : signUp - validateInputParams", 9);
                    let apiResponse = response.generate(true, "email Id provided does not meet the requirement standard", 500, null);
                    reject(apiResponse);
                } else if (check.isEmpty(req.body.password)) {

                    logger.error("password not provided", "userController : signUp - validateInputParams", 9);
                    let apiResponse = response.generate(true, "password not provided", 400, null);
                    reject(apiResponse);
                } else {
                    console.log("validate - resolved")
                    resolve();
                }
            } else {
                logger.error("email Id not provided", "userController : signUp - validateInputParams", 9);
                let apiResponse = response.generate(true, "email Id not provided", 400, null);
                reject(apiResponse);
            }
        })
    }

    let createUser = () => {
        console.log("userController - signup - createUser called")
        return new Promise((resolve, reject) => {
            // checking that the user email provided does not already exist
            userModel.find({ email: req.body.email }, (err, result) => {
                if (err) {
                    logger.error("error searching for existing user email", "userController : signUp - createUser", 9);
                    let apiResponse = response.generate(true, "error searching for user email", 500, err);
                    reject(apiResponse);
                } else if (check.isEmpty(result)) {
                    let newUser = new userModel({
                        userId: shortid.generate(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName || '',
                        email: req.body.email,
                        password: generatePassword.generatePassword(req.body.password),
                        mobileNumber: req.body.mobileNumber,
                        countryCode: req.body.countryCode,
                        createdOn: Date.now(),
                        forgotPasswordKey: shortid.generate()
                    })
                    newUser.save((err, result) => {
                        if (err) {
                            logger.error("error saving new user", "userController : signUp - createUser", 10);
                            let apiResponse = response.generate(true, "error searching for user email", 500, err);
                            reject(apiResponse);
                        } else {
                            logger.info("saved new user", "userController : signUp - createUser", 10);
                            let userDetails = result.toObject();
                            delete userDetails.password;
                            delete userDetails._id;
                            delete userDetails.__v;
                            delete userDetails.forgotPasswordKey;
                            let apiResponse = response.generate(false, "signup success", 200, userDetails);
                            resolve(apiResponse);
                        }
                    })
                } else {
                    logger.error("user already exists with the given email", "userController : signUp - createUser", 10);
                    let apiResponse = response.generate(true, "user with the given email already exists", 400, null);
                    reject(apiResponse);
                }
            })
        })
    }

    validateInputParams()
        .then(createUser)
        .then((response) => {
            console.log(response);
            res.send(response)
        })
        .catch((error) => {
            res.send(error)
        })

}

let login = (req, res) => {

    // checking if valid login details have been input
    let validateInputParams = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                userModel.findOne({ email: req.body.email }, (err, result) => {
                    if (err) {
                        logger.error("error retreiving user details", "userController : login - validateInputParams", 10);
                        let apiResponse = response.generate(true, "error retreiving user details", 500, err);
                        reject(apiResponse);
                    } else if (check.isEmpty(result)) {
                        logger.error("user details not found", "userController : login - validateInputParams", 10);
                        let apiResponse = response.generate(true, "user details not found", 404, null);
                        reject(apiResponse);
                    } else {
                        logger.info("user found", "userController : login - validateInputParams", 9);
                        let userDetails = result.toObject();
                        resolve(userDetails);
                    }
                })
            } else {
                logger.error("user input missing email", "userController : login - validateInputParams", 10);
                let apiResponse = response.generate(true, "email of the user not provided", 400, null);
                reject(apiResponse);
            }
        })
    }

    // checking if the provided password matches before forwarding to token generation
    let checkPassword = (userDetails) => {
        return new Promise((resolve, reject) => {
            generatePassword.comparePassword(req.body.password, userDetails.password, (err, isMatch) => {
                if (err) {
                    logger.error("error comparing passwords", "userController : login - checkPassword", 10);
                    let apiResponse = response.generate(true, "error comparing user password", 500, err);
                    reject(apiResponse);
                } else if (isMatch) {
                    let retreivedUserDetails = userDetails
                    delete retreivedUserDetails.password;
                    delete retreivedUserDetails.__v;
                    delete retreivedUserDetails._id;
                    delete retreivedUserDetails.createdOn;

                    resolve(retreivedUserDetails);
                } else {
                    logger.error("Invalid user password", "userController : login - checkPassword", 10);
                    let apiResponse = response.generate(true, "invalid user password", 400, null);
                    reject(apiResponse);
                }
            })
        })
    }

    //generating token
    let generateToken = (retreivedUserDetails) => {
        return new Promise((resolve, reject) => {
            token.generateToken(retreivedUserDetails, (err, tokenDetails) => {
                if (err) {
                    logger.error("error generating token", "userController : login - generateToken", 10);
                    let apiResponse = response.generate(true, "error generating token", 500, err);
                    reject(apiResponse);
                } else {
                    logger.info("token generation success", "userController : login - generateToken", 9);
                    tokenDetails.userId = retreivedUserDetails.userId;
                    tokenDetails.userDetails = retreivedUserDetails;

                    resolve(tokenDetails);
                }
            })
        })
    }

    // save token details and send the user details to the users logged in 
    let saveTokenDetails = (tokenDetails) => {
        return new Promise((resolve, reject) => {
            authModel.findOne({ userId: tokenDetails.userId }, (err, existingTokenDetails) => {
                if (err) {
                    logger.error("error retreiving token details from DB", "userController : login - saveTokenDetails", 10);
                    let apiResponse = response.generate(true, "error retreiving token details from DB", 500, err);
                    reject(apiResponse);
                } else if (check.isEmpty(existingTokenDetails)) {
                    let newTokenDetails = new authModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.LocalTimeNow()
                    })

                    newTokenDetails.save((err, result) => {
                        if (err) {
                            logger.error("error saving new token details", "userController : login - saveTokenDetails", 10);
                            let apiResponse = response.generate(true, "login error", 500, err);
                            reject(apiResponse);
                        } else {
                            logger.info("token details saved successfully", "userController : login - saveTokenDetails", 9);


                            let details = {
                                userToken: result.authToken,
                                userDetails: tokenDetails.userDetails
                            }

                            resolve(details);
                        }
                    })
                } else {
                    existingTokenDetails.authToken = tokenDetails.token;
                    existingTokenDetails.tokenSecret = tokenDetails.tokenSecret;
                    existingTokenDetails.tokenGenerationTime = Date.now();

                    existingTokenDetails.save((err, result) => {
                        if (err) {
                            logger.error("error updating token details", "userController : login - saveTokenDetails", 10);
                            let apiResponse = response.generate(true, "login error", 500, err);
                            reject(apiResponse);
                        } else {

                            logger.info("token details saved successfully", "userController : login - saveTokenDetails", 9);

                            let details = {
                                userToken: result.authToken,
                                userDetails: tokenDetails.userDetails
                            }

                            resolve(details);
                        }
                    })
                }
            })
        })
    }

    validateInputParams()
        .then(checkPassword)
        .then(generateToken)
        .then(saveTokenDetails)
        .then((resolve) => {

            let apiResponse = response.generate(false, "login success", 200, resolve);
            res.send(apiResponse);
        })
        .catch((error) => {
            res.send(error);
        })

}


// gets all the user details available on the db
let getAllUsers = (req, res) => {
    userModel.find()
        .select('-__v -_id -password -createdOn')
        .sort('firstName')
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.error("error getting user details", "userController : getAllUsers", 10);
                let apiResponse = response.generate(true, "error getting all users", 500, err);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {

                logger.error("no users found", "userController : getAllUsers", 10);
                let apiResponse = response.generate(true, "no users found", 404, null);
                res.send(apiResponse);
            } else {
                logger.info("users found", "userController : getAllUsers", 10);
                let apiResponse = response.generate(false, " users found", 200, result);
                res.send(apiResponse);
            }
        })
}


// to get single user details from DB
let getSingleUser = (req, res) => {
    userModel.findOne({ userId: req.body.userId })
        .select('-__v -_id -password -createdOn')
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.error("error getting user details", "userController : getSingleUser", 10);
                let apiResponse = response.generate(true, "error getting single user details", 500, err);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {

                logger.error("no user found", "userController : getSingleUser", 10);
                let apiResponse = response.generate(true, "no user found", 404, null);
                res.send(apiResponse);
            } else {
                logger.info("users found", "userController : getSingleUser", 10);
                let apiResponse = response.generate(false, " users found", 200, result);
                res.send(apiResponse);
            }
        })
}


//edit user details
let editUser = (req, res) => {
    
    let options = req.body;
    userModel.update({ userId: req.params.userId }, options, (err, result) => {
        if (err) {
            logger.error("error updating user details", "userController : editUser", 10);
            let apiResponse = response.generate(true, "error updating user details", 500, err);
            res.send(apiResponse);
        } else if (result.n === 0) {
            logger.error("no user found", "userController : editUser", 10);
            let apiResponse = response.generate(true, "no user found", 404, null);
            res.send(apiResponse);
        } else {
            logger.info("users updated", "userController : editUser", 10);
            let apiResponse = response.generate(false, " user details updated for : " + result.nModified + " details", 200, result);
            res.send(apiResponse);
        }
    })
}

// edit password on forgotPassword
let editUserPassword = (req, res)=>{
    userModel.updateOne({userId : req.user.userId}, {$set : {password : generatePassword.generatePassword(req.body.password)}}, (err, result)=>{
        if(err){
            logger.error("error updating password","userController : editUserPassword ", 9);
            let apiResponse = response.generate(true, "error updating password", 500, err);
            res.send(apiResponse);
        }else if(result.n === 0){
            logger.error("no user found", "userController : editUserPassword", 10);
            let apiResponse = response.generate(true, "no user found", 404, null);
            res.send(apiResponse);
        }else {
            logger.info("user password updated", "userController : editUser", 10);
            let apiResponse = response.generate(false, " user password updated for : " + result.nModified + " details", 200, result);
            res.send(apiResponse);
        }
    })
}


// delete user
let deleteUser = (req, res) => {
    userModel.remove({ userId: req.params.userId }, (err, result) => {
        if (err) {
            logger.error("error deleting user details", "userController : deleteUser", 10);
            let apiResponse = response.generate(true, "error deleting user details", 500, err);
            res.send(apiResponse);
        } else if (result.n === 0) {
            logger.error("no user found", "userController : deleteUser", 10);
            let apiResponse = response.generate(true, "no user found", 404, null);
            res.send(apiResponse);
        } else {
            logger.info("user deleted", "userController : deleteUser", 10);
            let apiResponse = response.generate(false, " user deleted", 200, result);
            res.send(apiResponse);
        }
    })
}

// on verifying email and phoneNumber this sends a new token generated with one hour expiry
let forgotPassword = (req, res) => {

    // verfiying if the user provided email id exists in the db
    let validateInputParams = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                userModel.findOne({ email: req.body.email }, (err, result) => {
                    if (err) {
                        logger.error("error finding user details", "userController : forgotPassword - validateInputParams", 10);
                        let apiResponse = response.generate(true, "error finding user details", 500, err);
                        reject(apiResponse);
                    } else if (check.isEmpty(result)) {
                        logger.error("no user found", "userController : forgotPassword - validateInputParams", 10);
                        let apiResponse = response.generate(true, "no user found", 404, null);
                        reject(apiResponse);
                    } else {
                        logger.info("user found", "userController : forgotPassword - validateInputParams", 10);
                        let userDetails = result.toObject();
                        resolve(userDetails);
                    }
                })
            } else {
                logger.error("user email not provided", "userController : forgotPassword - validateInputParams", 10);
                let apiResponse = response.generate(true, "user email not provided", 400, null);
                reject(apiResponse);
            }
        })
    }

    // checking for user mobileNumber and provided mobile number and creating a two minute token
    let generateTwoMinuteToken = (userDetails) => {
        return new Promise((resolve, reject) => {
            if (req.body.mobileNumber == userDetails.mobileNumber) {
                delete userDetails.password;
                delete userDetails.__v;
                delete userDetails._id;
                delete userDetails.createdOn;

                token.generateForgotPasswordToken(userDetails, (err, tokenDetails) => {
                    if (err) {
                        logger.error("error generating new token", "userController : forgotPassword - generateTwoMinuteToken", 9);
                        let apiResponse = response.generate(true, "error generating new token", 500, err);
                        reject(apiResponse);
                    } else {
                        logger.info("two minute token generation success", "userController : forgotPassword - generateTwoMinuteToken", 9);
                        tokenDetails.userId = userDetails.userId;
                        tokenDetails.userDetails = userDetails;

                        resolve(tokenDetails);
                    }
                })
            } else {
                logger.error("user mobileNumber incorrect", "userController : forgotPassword - generateTwoMinuteToken", 9);
                let apiResponse = response.generate(true, "user mobileNumber incorrect", 400, null);
                reject(apiResponse);
            }
        })
    }

    // saving two minute token
    let saveTwoMinuteToken = (tokenDetails) => {
        return new Promise((resolve, reject) => {
            authModel.findOne({ userId: tokenDetails.userId }, (err, existingTokenDetails) => {
                if (err) {
                    logger.error("error retreiving token details from DB", "userController : forgotPassword - saveTwoMinuteToken", 10);
                    let apiResponse = response.generate(true, "error retreiving token details from DB", 500, err);
                    reject(apiResponse);
                } else if (check.isEmpty(existingTokenDetails)) {
                    // for a user that has never signed in after signup and forgot password on first login
                    let newTokenDetails = new authModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.LocalTimeNow()
                    })

                    newTokenDetails.save((err, result) => {
                        if (err) {
                            logger.error("error saving new token details", "userController : forgotPassword - saveTwoMinuteToken", 10);
                            let apiResponse = response.generate(true, "login error", 500, err);
                            reject(apiResponse);
                        } else {
                            logger.info("token details saved successfully", "userController : forgotPassword - saveTwoMinuteToken", 9);


                            let details = {
                                userToken: result.authToken,
                                userDetails: tokenDetails.userDetails
                            }

                            resolve(details);
                        }
                    })
                } else {
                    existingTokenDetails.authToken = tokenDetails.token;
                    existingTokenDetails.tokenSecret = tokenDetails.tokenSecret;
                    existingTokenDetails.tokenGenerationTime = Date.now();

                    existingTokenDetails.save((err, result) => {
                        if (err) {
                            logger.error("error updating token details", "userController : login - saveTokenDetails", 10);
                            let apiResponse = response.generate(true, "error saving new token", 500, err);
                            reject(apiResponse);
                        } else {

                            logger.info("token details saved successfully", "userController : login - saveTokenDetails", 9);

                            let details = {
                                userToken: result.authToken,
                                userDetails: tokenDetails.userDetails
                            }

                            resolve(details);
                        }
                    })
                }
            })
        })
    }

    validateInputParams()
    .then(generateTwoMinuteToken)
    .then(saveTwoMinuteToken)
    .then((resolve)=>{
        let apiResponse = response.generate(false, "new token generated for forgot password - use this token for updating password",200, resolve);
        res.send(apiResponse);
    })
    .catch((error)=>{
        res.send(error);
    })

}


module.exports = {
    signup: signup,
    login: login,
    getAllUsers: getAllUsers,
    getSingleUser: getSingleUser,
    editUser: editUser,
    deleteUser: deleteUser,
    forgotPassword : forgotPassword,
    editUserPassword : editUserPassword
}