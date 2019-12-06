const express = require('express');

const auth = require('../middleware/auth');

const controller = require('../controller/friendController');

const config = require('../../config/appConfig');

setRouter = (app)=>{

let baseUrl = `${config.apiVersion}/friends`;

// required body params : listTitle
    // required body/header/query param : authToken
    // optional body params : listDescription
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
            "message": "success creating new list",
            "status": 200,
            "data": {
                "listOwner": "--------",
                "listDescription": "",
                "listCreatedOn": "DATE",
                "listStatus": "open",
                "listTitle": "title",
                "listId": "LISTID",
            }
        }
     * 
     * @apiErrorExample {json} Error- Response:
     * {
     * "errorOccurred": true,
        "message": "internal DB error", 
        "status": 500,
        "data": "error data"
     * }
     *  
     * @apiErrorExample {json} Error- Response:
     * {
            "errorOccured": true,
            "message": "given title already exists is still open - please add item to the list",
            "status": 400,
            "data": null
        }
     */


    }

    module.exports = {
        setRouter : setRouter
    }