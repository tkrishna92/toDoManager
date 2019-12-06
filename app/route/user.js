const express = require('express');
const controller = require('../controller/userController');
const appConfig = require('../../config/appConfig');
const auth = require('../middleware/auth');

let setRouter = (app) => {

    console.log("user - route called");

    let baseUrl = `${appConfig.apiVersion}/users`

    console.log(`${baseUrl}/signup`)

    // params : firstName, lastName, email, password, mobileNumber,countryCode
    app.post(`${baseUrl}/signup`, controller.signup);



    /**
     * @api {post} user signup - for new user signup
     * @apiVersion 1.0.0
     * @apiGroup users
     * 
     * @apiParam {String} firstName user first name to be passed as body parameter
     * @apiParam {String} lastName user last name to be passed as body parameter
     * @apiParam {String} email users email Id to be passed as body parameter
     * @apiParam {String} password password starting with a capital alphabet containing atleast 8 characters to be passed as body parameter
     * @apiParam {String} mobileNumber user's mobileNumber to be passed as body parameter
     *  @apiParam {String} countryCode user's country code to be passed as body parameter
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
            "errorOccured": false,
            "message": "signup success",
            "status": 200,
            "data": {
                "userId": "--------",
                "firstName": "abccde",
                "lastName": "abccse",
                "email": "abc@somedomain.com",
                "mobileNumber": 1234567890,
                "countryCode": "+91",
                "createdOn": "1575445340092",
                "roomId": "---------"
            }
        }
     * 
     * @apiErrorExample {json} Error- Response:
     * {
     * "errorOccurred": true,
        "message": "signup error", 
        "status": 500,
        "data": "error data"
     * }
     *  
     * @apiErrorExample {json} Error- Response:
     * {
            "errorOccured": true,
            "message": "user with the given email already exists",
            "status": 400,
            "data": null
        }
     */


    // params : email, password
    app.post(`${baseUrl}/login`, controller.login);


    /**
     * @api {post} user login - for existing user login
     * @apiVersion 1.0.0
     * @apiGroup users
     * 
     * @apiParam {String} email users email Id to be passed as body parameter
     * @apiParam {String} password password starting with a capital alphabet containing atleast 8 characters to be passed as body parameter
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
            "errorOccured": false,
            "message": "login success",
            "status": 200,
            "data": {
                "userToken": "aaaaaaaaabbbbbbbbbbcccccccccdddddddddeeeeeeeasdjkfla;sdjfkjl;",
                "userDetails": {
                    "userId": "---------",
                    "firstName": "----------",
                    "lastName": "--------",
                    "email": "----@somedomain.com",
                    "mobileNumber": 1234567890,
                    "countryCode": "+91",
                    "roomId": "----------"
                }
            }
     * }
     * 
     * * @apiErrorExample {json} Error- Response:
     * {
     *      "errorOccured": true,
            "message": "invalid user password",
            "status": 400,
            "data": null
     * }
     * 
     * 
     * @apiErrorExample {json} Error- Response:
     * {
     * "errorOccurred": true,
        "message": "login error",
        "status": 500,
        "data": "error data"
     * }
     *  
     */


    // params : email, password
    // header : authToken
    app.get(`${baseUrl}/getAllUsers`, auth.isAuthenticated, controller.getAllUsers);


    /**
     * @api {get} user get-all-users - for getting all the user details available on the db
     * @apiVersion 1.0.0
     * @apiGroup users
     * 
     * @apiParam {String} userId userId of the user requesting the data to be passed as body parameter
     * @apiParam {String} authToken authToken of the user to be passed as body, query or header parameter
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
            "errorOccured": false,
            "message": "users found",
            "status": 200,
            "data": {
                       {
                        "userToken": "aaaaaaaaabbbbbbbbbbcccccccccdddddddddeeeeeeeasdjkfla;sdjfkjl;",
                        "userDetails": {
                            "userId": "---------",
                            "firstName": "----------",
                            "lastName": "--------",
                            "email": "----@somedomain.com",
                            "mobileNumber": 1234567890,
                            "countryCode": "+91"
                        },
                        {
                        "userToken": "aaaaaaaaabbbbbbbbbbcccccccccdddddddddeeeeeeeasdjkfla;sdjfkjl;",
                        "userDetails": {
                            "userId": "---------",
                            "firstName": "----------",
                            "lastName": "--------",
                            "email": "----@somedomain.com",
                            "mobileNumber": 1234567890,
                            "countryCode": "+91"
                        },
                        {
                        "userToken": "aaaaaaaaabbbbbbbbbbcccccccccdddddddddeeeeeeeasdjkfla;sdjfkjl;",
                        "userDetails": {
                            "userId": "---------",
                            "firstName": "----------",
                            "lastName": "--------",
                            "email": "----@somedomain.com",
                            "mobileNumber": 1234567890,
                            "countryCode": "+91"
                        }
                    }
     * }
     * 
     * * @apiErrorExample {json} Error- Response:
     * {
     *      "errorOccured": true,
            "message": "invalid user password",
            "status": 400,
            "data": null
     * }
     * 
     * 
     * @apiErrorExample {json} Error- Response:
     * {
     * "errorOccurred": true,
        "message": "login error",
        "status": 500,
        "data": "error data"
     * }
     *  
     */

    // params : email, password
    //
    app.get(`${baseUrl}/getSingleUser`, auth.isAuthenticated, controller.getSingleUser);


    /**
     * @api {get} user get-single-users - for getting single user details available on the db
     * @apiVersion 1.0.0
     * @apiGroup users
     * 
     * @apiParam {String} userId userId of the user whose data is being requested passed as body parameter
     * @apiParam {String} authToken authToken of the user to be passed as body, query or header parameter
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
            "errorOccured": false,
            "message": "users found",
            "status": 200,
            "data": {
                       {
                        "userToken": "aaaaaaaaabbbbbbbbbbcccccccccdddddddddeeeeeeeasdjkfla;sdjfkjl;",
                        "userDetails": {
                            "userId": "---------",
                            "firstName": "----------",
                            "lastName": "--------",
                            "email": "----@somedomain.com",
                            "mobileNumber": 1234567890,
                            "countryCode": "+91"
                        },
                        
                    }
     * }
     * 
     * * @apiErrorExample {json} Error- Response:
     * {
     *      "errorOccured": true,
            "message": "User's authentication details not found",
            "status": 404,
            "data": null
     * }
     * 
     * 
     * @apiErrorExample {json} Error- Response:
     * {
     * "errorOccurred": true,
        "message": "error getting user details",
        "status": 500,
        "data": "error data"
     * }
     *  
     */




    // params : userId
    // header/body/query : authToken
    // body : options that have to be edited/updated
    app.put(`${baseUrl}/:userId/edit`, auth.isAuthenticated, controller.editUser);


    /**
     * @api {put} user edit-user - for editing the user details available on the db
     * @apiVersion 1.0.0
     * @apiGroup users
     * 
     * @apiParam {String} userId userId of the user whose data about to be editted will be passed as query parameter
     * @apiParam {String} authToken authToken of the user to be passed as body, query or header parameter
     * @apiParam {String} editParameter properties of the user that have to be editted to be passed as body. any parameter other than password accepted
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
           "errorOccured": false,
           "message": " user details updated for : 0 details",
           "status": 200,
           "data": {
               "n": 1,
               "nModified": 1,
               "ok": 1
           }
     * }
     * 
     * * @apiErrorExample {json} Error- Response:
     * {
     *      "errorOccured": true,
            "message": "no user found",
            "status": 404,
            "data": null
     * }
     * 
     * 
     * @apiErrorExample {json} Error- Response:
     * {
     * "errorOccurred": true,
        "message": "error editing user details",
        "status": 500,
        "data": "error data"
     * }
     *  
     */



    // params : userId
    // header/body/query : authToken
    app.put(`${baseUrl}/:userId/delete`, auth.isAuthenticated, controller.deleteUser);

    /**
     * @api {put} user delete-user - for deleting user details available on the db
     * @apiVersion 1.0.0
     * @apiGroup users
     * 
     * @apiParam {String} userId userId of the user whose data is being requested passed as body parameter
     * @apiParam {String} authToken authToken of the user to be passed as body, query or header parameter
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
           "errorOccured": false,
           "message": " user deleted",
           "status": 200,
           "data": {
               "n": 1,
               "ok": 1,
               "deletedCount": 1
           }
       }
     * 
     * * @apiErrorExample {json} Error- Response:
     * {
     *      "errorOccured": true,
            "message": "no user found",
            "status": 404,
            "data": null
     * }
     * 
     * 
     * @apiErrorExample {json} Error- Response:
     * {
     * "errorOccurred": true,
        "message": "error deleting user",
        "status": 500,
        "data": "error data"
     * }
     *  
     */



     // params : email, mobileNumer to be setn as body parameters
    app.post(`${baseUrl}/forgotPassword`, controller.forgotPassword);
    /**
     * @api {post} user forgotPassword - for recovering of forgotten password
     * @apiVersion 1.0.0
     * @apiGroup users
     * 
     * @apiParam {String} email users email Id to be passed as body parameter
     * @apiParam {String} mobileNumber mobile number of the user that was initially used while signup to be passed as body parameter
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
            "errorOccured": false,
            "message": "new token generated for forgot password - use this token for updating password- valid for 2 minutes",
            "status": 200,
            "data": {
                "userToken": "aaaaaaaaabbbbbbbbbbcccccccccdddddddddeeeeeeeasdjkfla;sdjfkjl;",
                "userDetails": {
                    "userId": "---------",
                    "firstName": "----------",
                    "lastName": "--------",
                    "email": "----@somedomain.com",
                    "mobileNumber": 1234567890,
                    "countryCode": "+91"
                }
            }
     * }
     * 
     * * @apiErrorExample {json} Error- Response:
     * {
            "errorOccured": true,
            "message": "user mobileNumber incorrect",
            "status": 400,
            "data": null
     * }
     * 
     * 
     * @apiErrorExample {json} Error- Response:
     * {
     * "errorOccurred": true,
        "message": "error saving new token",
        "status": 500,
        "data": "error data"
     * }
     *  
     */


    // params : userId
    // header/body/query : authToken
    // body : password
    app.put(`${baseUrl}/:userId/editPassword`, auth.isAuthenticated, controller.editUserPassword);


    /**
     * @api {put} user edit-password - for editing password from the user details available on the db
     * @apiVersion 1.0.0
     * @apiGroup users
     * 
     * @apiParam {String} userId userId of the user whose data is being requested passed as query parameter
     * @apiParam {String} authToken authToken of the user to be passed as body, query or header parameter
     * @apiParam {String} editParameter editParameter of the user to be passed as body. any parameter other than password accepted
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
           "errorOccured": false,
           "message": " user password updated for : 1 details",
           "status": 200,
           "data": {
               "n": 1,
               "nModified": 1,
               "ok": 1
           }
     * }
     * 
     * * @apiErrorExample {json} Error- Response:
     * {
     *      "errorOccured": true,
            "message": "no user found",
            "status": 404,
            "data": null
     * }
     * 
     * 
     * @apiErrorExample {json} Error- Response:
     * {
     * "errorOccurred": true,
        "message": "error editing user details",
        "status": 500,
        "data": "error data"
     * }
     *  
     * 
     * @apiErrorExample {json} Error- Response:
     * {
           "errorOccured": true,
           "message": "error verifying user's authentication details",
           "status": 500,
           "data": {
               "name": "TokenExpiredError",
               "message": "jwt expired",
               "expiredAt": "2019-12-04T15:34:18.000Z"
           }
     * }
     *  
     */


    // params : userId
    // header/body/query : authToken
    app.put(`${baseUrl}/logout`, auth.isAuthenticated, controller.logout);

    /**
     * @api {put} user logout - for logging out the user and removing the auth details from the db.
     * @apiVersion 1.0.0
     * @apiGroup users
     * 
     
     * @apiParam {String} authToken authToken of the user to be passed as body, query or header parameter
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
           "errorOccured": false,
           "message": " logout successful",
           "status": 200,
           "data": {
               "n": 1,
               "ok": 1,
               "deletedCount": 1
           }
     * }
     * 
     * * @apiErrorExample {json} Error- Response:
     * {
     *      "errorOccured": true,
            "message": "User's authentication details not found",
            "status": 404,
            "data": null
     * }
     * 
     * 
     * @apiErrorExample {json} Error- Response:
     * {
     * "errorOccurred": true,
        "message": "error logging out user",
        "status": 500,
        "data": "error data"
     * }
     *  
     * 
     * @apiErrorExample {json} Error- Response:
     * {
           "errorOccured": true,
           "message": "error verifying user's authentication details",
           "status": 500,
           "data": {
               "name": "TokenExpiredError",
               "message": "jwt expired",
               "expiredAt": "2019-12-04T15:34:18.000Z"
           }
     * }
     *  
     */



}




module.exports = {
    setRouter: setRouter
}