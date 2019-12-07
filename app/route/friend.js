const express = require('express');

const auth = require('../middleware/auth');

const controller = require('../controller/friendController');

const config = require('../../config/appConfig');

setRouter = (app) => {

    let baseUrl = `${config.apiVersion}/friends`;

    app.get(`${baseUrl}/getAllTestRequests`, auth.isAuthenticated, controller.getAllTestRequests);
    app.get(`${baseUrl}/getUserTestRequests`, auth.isAuthenticated, controller.getUserTestRequests);
    app.get(`${baseUrl}/deleteAllTestRequests`, auth.isAuthenticated, controller.deleteAllTestRequests);
    app.get(`${baseUrl}/deleteTestRequests`, auth.isAuthenticated, controller.deleteTestRequest);



    // required body/header/query param : authToken
    // requires userId of the receiver to be sent as a body parameter
    app.post(`${baseUrl}/sendFriendRequest`, auth.isAuthenticated, controller.sendFriendRequest);



    /**
     * @api {post} friend sendFriendRequest - for creating new friend request
     * @apiVersion 1.0.0
     * @apiGroup friend
     * 
     * @apiParam {String} userId userId of the friend-request receiver to be passed as body parameter
     * @apiParam {String} authToken authToken of the user sending the request to be sent as header/body/query/path parameter
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
            "errorOccured": false,
            "message": "request sent successfully",
            "status": 200,
            "data": {
                "friendName": "Hari Haran",
                "isFriend": false,
                "userId": "oLQ5Dbn3",
                "friendId": "aAg78NDM",
                "friendRoom": "Iyn40QV8Y"
            }
        }
     * 
     * @apiErrorExample {json} Error- Response:
     * {
     * "errorOccurred": true,
        "message": "error checking if the friend request exists", 
        "status": 500,
        "data": "error data"
     * }
     *  
     * @apiErrorExample {json} Error- Response:
     * {
            "errorOccured": true,
            "message": "friend request already sent and is pending acceptance",
            "status": 400,
            "data": null
        }
     */







    // required body/header/query param : authToken
    app.get(`${baseUrl}/checkRequest`, auth.isAuthenticated, controller.checkRequest);



    /**
     * @api {post} friend checkRequest - for checking pending requests available for the user
     * @apiVersion 1.0.0
     * @apiGroup friend
     * 
     * @apiParam {String} authToken authToken of the user sending the request to be sent as header/body/query/path parameter
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
            "errorOccured": false,
            "message": "pending requests found",
            "status": 200,
            "data": [
                {
                    "friendName": "Hari Haran",
                    "isFriend": false,
                    "_id": "5deb4be3d9defb42ecb2eb47",
                    "userId": "oLQ5Dbn3",
                    "friendId": "aAg78NDM",
                    "friendRoom": "Iyn40QV8Y",
                    "__v": 0
                }
            ]
        }
     * 
     * @apiErrorExample {json} Error- Response:
     * {
     * "errorOccurred": true,
        "message": "error retreiving pending request", 
        "status": 500,
        "data": "error data"
     * }
     *  
     * @apiErrorExample {json} Error- Response:
     * {
            "errorOccured": true,
            "message": "no pending requests found",
            "status": 404,
            "data": null
        }
     */


    // required body/header/query param : authToken
    // required body parameter : friendId
    app.put(`${baseUrl}/acceptFriend`, auth.isAuthenticated, controller.acceptFriend);



    /**
     * @api {post} friend acceptFriend - for accepting a freind request
     * @apiVersion 1.0.0
     * @apiGroup friend
     * 
     * @apiParam {String} authToken authToken of the user sending the request to be sent as header/body/query/path parameter
     * @apiParam {String} friendId : the id of the user that sent the friend request to be passed as body parameter
     * 
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
            "errorOccured": false,
            "message": "friend request accepted successfully",
            "status": 200,
            "data": {
                "friendName": "Hari Haran",
                "isFriend": true,
                "userId": "aAg78NDM",
                "friendId": "oLQ5Dbn3",
                "friendRoom": "jIPcqP1Vb"
            }
        }
     * 
     * @apiErrorExample {json} Error- Response:
     * {
     * "errorOccurred": true,
        "message": "error retreiving acceptor's user details", 
        "status": 500,
        "data": "error data"
     * }
     *  
     * @apiErrorExample {json} Error- Response:
     * {
            "errorOccured": true,
            "message": "no such pending request found",
            "status": 404,
            "data": null
        }
     */


     // required body/header/query param : authToken
     // required body parameter : selectedUserId
    app.get(`${baseUrl}/friendCheck`, auth.isAuthenticated, controller.friendCheck);



    /**
     * @api {post} friend checkRequest - for checking pending requests available for the user
     * @apiVersion 1.0.0
     * @apiGroup friend
     * 
     * @apiParam {String} authToken authToken of the user sending the request to be sent as header/body/query/path parameter
     * @apiParam {String} selectedUserId user id of the selected user.
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
            "errorOccured": false,
            "message": "selected user is a friend of the current user",
            "status": 200,
            "data": {
                "friendName": "Hari Haran",
                "isFriend": true,
                "userId": "oLQ5Dbn3",
                "friendId": "aAg78NDM",
                "friendRoom": "Iyn40QV8Y"
            }
        }
     * 
     * @apiErrorExample {json} Error- Response:
     * {
     * "errorOccurred": true,
        "message": "error verifying user's friend", 
        "status": 500,
        "data": "error data"
     * }
     *  
     * @apiErrorExample {json} Error- Response:
     * {
            "errorOccured": true,
            "message": "selected user not a friend",
            "status": 400,
            "data": null
        }
     */


}




module.exports = {
    setRouter: setRouter
}