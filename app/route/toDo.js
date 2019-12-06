const express = require('express');

const appConfig = require('../../config/appConfig');

const auth = require('../middleware/auth');

const controller = require('../controller/toDoController');

let setRouter = (app)=>{

    let baseUrl = `${appConfig.apiVersion}/toDo`;


    app.get(`${baseUrl}/deleteList`, auth.isAuthenticated, controller.deleteTestList);
    app.get(`${baseUrl}/getAllLists`, auth.isAuthenticated, controller.getAllTestLists);
    app.get(`${baseUrl}/deleteItems`, auth.isAuthenticated, controller.deleteTestItem);
    app.get(`${baseUrl}/getAllItems`, auth.isAuthenticated, controller.getAllTestItems);



    // required body params : listTitle
    // required body/header/query param : authToken
    // optional body params : listDescription
    app.post(`${baseUrl}/createNewList`, auth.isAuthenticated, controller.createNewList);



    /**
     * @api {post} List createNewList - for creating new list
     * @apiVersion 1.0.0
     * @apiGroup list
     * 
     * @apiParam {String} listTitle name of the list to be passed as body parameter
     * @apiParam {String} listDescription  a description of the list to be passed as a body parameter - optional
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


    // required body params : title, listId
    // required body/header/query param : authToken
    // optional body params : description, dueDate, parent
    app.post(`${baseUrl}/createNewItem`, auth.isAuthenticated, controller.createNewItem);



    /**
     * @api {post} List createNewItem - for creating new item
     * @apiVersion 1.0.0
     * @apiGroup list
     * 
     * @apiParam {String} authToken authToken of the user creating the item to be passed as body/path/query/header param
     * @apiParam {String} listId id of the list the item is included in has to be passed as body parameter
     * @apiParam {String} title name of the item to be passed as body parameter
     * @apiParam {String} description  a description of the list to be passed as a body parameter - optional
     * @apiParam {String} dueDate dueDate of the item passed as body parameter
     * @apiParam {String} parent itemId of the parent to which the item has been added as a child to be passed as body parameter - needed only when adding as a sub-toDo-item
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
            "errorOccured": false,
            "message": "success creating new item",
            "status": 200,
            "data": {
                "title": "item title 1",
                "description": "item description 1",
                "previousId": "",
                "nextId": "",
                "owner": "------------",
                "createdOn": "2019-12-05T14:06:00.395Z",
                "dueDate": "2019-05-18T18:30:00.000Z",
                "modifiedBy": "",
                "modifiedOn": null,
                "parent": "",
                "children": [],
                "status": "open",
                "isHidden": false,
                "isPrivate": true,
                "privilegedAuthorId": [],
                "listId": "--------",
                "itemId": "--------"
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
            "message": "a list item with the given name exists on the given list",
            "status": 400,
            "data": null
        }
     */


    // required body params : listTitle
    // required body/header/query param : authToken
    // optional body params : description, title, dueDate
    app.post(`${baseUrl}/editItem`, auth.isAuthenticated, controller.editItem);



    /**
     * @api {post} List editItem - for editting existing item in a list
     * @apiVersion 1.0.0
     * @apiGroup list
     *
     * @apiParam {String} authToken authToken of the user creating the item to be passed as body/path/query/header param
     * @apiParam {String} itemId itemId of the item to be passed as body parameter
     * @apiParam {String} description  description of the item for editting to be passed as a body parameter - optional
     * @apiParam {String} title  title of the item for editting to be passed as a body parameter - optional
     * @apiParam {String} dueDate  dueDate of the iter for editting to be passed as a body parameter - optional
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
            "errorOccured": false,
            "message": "edit success",
            "status": 200,
            "data": {
                "title": "item title 5 - edited",
                "description": "item description 1 - edited",
                "previousId": "previousID",
                "nextId": "",
                "owner": "ownerId",
                "createdOn": "2019-12-05T18:20:01.351Z",
                "dueDate": "2019-05-16T18:30:00.000Z",
                "modifiedBy": "editRequestSenderId",
                "modifiedOn": "2019-12-05T18:25:00.997Z",
                "parent": "rsaFnrew",
                "children": [],
                "status": "open",
                "isHidden": false,
                "isPrivate": true,
                "privilegedAuthorId": [],
                "listId": "--------",
                "itemId": "--------"
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
            "message": "item does not exist",
            "status": 404,
            "data": null
        }
     */

    // required body params : listId
    // required body/header/query param : authToken
    // optional body params : listDescription, listTitle
    app.put(`${baseUrl}/editList`, auth.isAuthenticated, controller.editList);



    /**
     * @api {post} List editList - for editing existing list details
     * @apiVersion 1.0.0
     * @apiGroup list
     *
     * @apiParam {String} authToken authToken of the user creating the item to be passed as body/path/query/header param
     * @apiParam {String} itemId itemId of the item to be passed as body parameter
     * @apiParam {String} listDescription  description of the item for editting to be passed as a body parameter - optional
     * @apiParam {String} listTitle  title of the item for editting to be passed as a body parameter - optional
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
            "errorOccured": false,
            "message": "list edited successfully",
            "status": 200,
            "data": {
                "n": 1,
                "nModified": 1,
                "ok": 1
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
            "message": "listId to be edited is not provided",
            "status": 400,
            "data": null
        }
     */






    // required path params : itemId
    // required body/header/query param : authToken
    app.post(`${baseUrl}/:itemId/deleteItem`, auth.isAuthenticated, controller.deleteItem);



    /**
     * @api {post} List deleteItem - for deleting item in a list
     * @apiVersion 1.0.0
     * @apiGroup list
     *
     * @apiParam {String} authToken authToken of the user creating the item to be passed as body/path/query/header param 
     * @apiParam {String} itemId itemId of the item to be passed as path parameter
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
            "errorOccured": false,
            "message": "item deleted successfully",
            "status": 200,
            "data": {
                "n": 1,
                "ok": 1,
                "deletedCount": 1
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
            "message": "item not found",
            "status": 404,
            "data": null
        }
     */


    // required path params : listId
    // required body/header/query param : authToken
    app.post(`${baseUrl}/:listId/deleteList`, auth.isAuthenticated, controller.deleteList);



    /**
     * @api {post} List deleteList - for deleting a list
     * @apiVersion 1.0.0
     * @apiGroup list
     *
     * @apiParam {String} authToken authToken of the user creating the item to be passed as body/path/query/header param 
     * @apiParam {String} listId listId of the item to be passed as path parameter
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
            "errorOccured": false,
            "message": "list deleted successfully",
            "status": 200,
            "data": {
                "n": 1,
                "ok": 1,
                "deletedCount": 1
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
            "message": "list not found",
            "status": 404,
            "data": null
        }
     */


    // required path params : userId
    // required body/header/query param : authToken
    app.get(`${baseUrl}/getUserAllLists`, auth.isAuthenticated, controller.getUserAllLists);



    /**
     * @api {post} List getUserAllLists - for getting all the lists with the userId provided as owner
     * @apiVersion 1.0.0
     * @apiGroup list
     *
     * @apiParam {String} authToken authToken of the user creating the item to be passed as body/path/query/header param 
     * @apiParam {String} userId userId of the owner of the list to be passed as body parameter
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
            "errorOccured": false,
            "message": "user lists found",
            "status": 200,
            "data": [
                {
                    "listOwner": "urDcyozH",
                    "listDescription": "",
                    "listCreatedOn": "2019-12-05T20:02:43.449Z",
                    "listStatus": "open",
                    "listTitle": "title 2",
                    "listId": "-riAWN4k"
                },
                {
                    "listOwner": "urDcyozH",
                    "listDescription": "",
                    "listCreatedOn": "2019-12-05T20:03:41.174Z",
                    "listStatus": "open",
                    "listTitle": "title 4",
                    "listId": "Hu5TMTk_"
                }
            ]
        }
     * 
     * @apiErrorExample {json} Error- Response:
     * {
     * "errorOccurred": true,
        "message": "error retreiving lists of the user", 
        "status": 500,
        "data": "error data"
     * }
     *  
     * @apiErrorExample {json} Error- Response:
     * {
            "errorOccured": true,
            "message": "user's list not found",
            "status": 404,
            "data": null
        }
     */

    // required path params : listId
    // required body/header/query param : authToken
    app.get(`${baseUrl}/getAllListItems`, auth.isAuthenticated, controller.getAllListItems);



    /**
     * @api {post} List getAllListItems - for getting all the items of the lists with the given listId
     * @apiVersion 1.0.0
     * @apiGroup list
     *
     * @apiParam {String} authToken authToken of the user creating the item to be passed as body/path/query/header param 
     * @apiParam {String} listId listId of the items that they belong to must be passed as body parameter
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
    "errorOccured": false,
    "message": "list items found",
    "status": 200,
    "data": [
        {
            "title": "item title 1",
            "description": "item description 1",
            "previousId": "",
            "nextId": "",
            "owner": "urDcyozH",
            "createdOn": "2019-12-06T06:44:05.583Z",
            "dueDate": "2019-05-18T18:30:00.000Z",
            "modifiedBy": "",
            "modifiedOn": null,
            "parent": "",
            "children": [],
            "status": "open",
            "isHidden": false,
            "isPrivate": true,
            "privilegedAuthorId": [],
            "listId": "gMD9N25e",
            "itemId": "w_5m5ORP"
        },
        {
            "title": "item title 2",
            "description": "item description 2",
            "previousId": "",
            "nextId": "",
            "owner": "urDcyozH",
            "createdOn": "2019-12-06T06:44:27.131Z",
            "dueDate": "2019-05-18T18:30:00.000Z",
            "modifiedBy": "",
            "modifiedOn": null,
            "parent": "",
            "children": [],
            "status": "open",
            "isHidden": false,
            "isPrivate": true,
            "privilegedAuthorId": [],
            "listId": "gMD9N25e",
            "itemId": "RHuamp-n"
        }
    ]
}
     * 
     * @apiErrorExample {json} Error- Response:
     * {
     * "errorOccurred": true,
        "message": "error retreiving items of the user", 
        "status": 500,
        "data": "error data"
     * }
     *  
     * @apiErrorExample {json} Error- Response:
     * {
            "errorOccured": true,
            "message": "listId for the items required not provided",
            "status": 400,
            "data": null
        }
     * 
     * 
     * @apiErrorExample {json} Error- Response:
     * {
            "errorOccured": true,
            "message": "list's items not found",
            "status": 404,
            "data": null
        }
     */


    // required path params : itemId
    // required body/header/query param : authToken
    app.put(`${baseUrl}/:itemId/markItemAsDone`, auth.isAuthenticated, controller.markItemAsDone);



    /**
     * @api {post} List markItemAsDone - for marking an item as done
     * @apiVersion 1.0.0
     * @apiGroup list
     *
     * @apiParam {String} authToken authToken of the user creating the item to be passed as body/path/query/header param 
     * @apiParam {String} itemId itemId of the item to be passed as path parameter
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
            "errorOccured": false,
            "message": "item marked as done",
            "status": 200,
            "data": {
                "n": 1,
                "nModified": 1,
                "ok": 1
            }
        }
     * 
     * @apiErrorExample {json} Error- Response:
     * {
     *      "errorOccurred": true,
            "message": "internal DB error", 
            "status": 500,
            "data": "error data"
     * }
     *  
     * @apiErrorExample {json} Error- Response:
     * {
            "errorOccured": true,
            "message": "no item of given itemId found to mark as done",
            "status": 404,
            "data": null
        }
     */


     // required path params : itemId
    // required body/header/query param : authToken
    app.put(`${baseUrl}/:itemId/markItemAsOpen`, auth.isAuthenticated, controller.markItemAsOpen);



    /**
     * @api {post} List markItemAsOpen - for marking an item as open
     * @apiVersion 1.0.0
     * @apiGroup list
     *
     * @apiParam {String} authToken authToken of the user creating the item to be passed as body/path/query/header param 
     * @apiParam {String} itemId itemId of the item to be passed as path parameter
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
            "errorOccured": false,
            "message": "item marked as open",
            "status": 200,
            "data": {
                "n": 1,
                "nModified": 1,
                "ok": 1
            }
        }
     * 
     * @apiErrorExample {json} Error- Response:
     * {
     *      "errorOccurred": true,
            "message": "internal DB error", 
            "status": 500,
            "data": "error data"
     * }
     *  
     * @apiErrorExample {json} Error- Response:
     * {
            "errorOccured": true,
            "message": "no item of given itemId found to mark as open",
            "status": 404,
            "data": null
        }
     */


    // required path params : itemId
    // required body/header/query param : authToken
    app.put(`${baseUrl}/:itemId/undoAction`, auth.isAuthenticated, controller.undoAction);



    /**
     * @api {post} List undoAction - for undoing the most recent action
     * @apiVersion 1.0.0
     * @apiGroup list
     *
     * @apiParam {String} authToken authToken of the user creating the item to be passed as body/path/query/header param
     * @apiParam {String} itemId itemId of the item to be passed as path parameter
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
            "errorOccured": false,
            "message": "undo successfull",
            "status": 200
        }
     * 
     * @apiErrorExample {json} Error- Response:
     * {
     * "errorOccurred": true,
        "message": "error updating current version", 
        "status": 500,
        "data": "error data"
     * }
     *  
     * @apiErrorExample {json} Error- Response:
     * {
            "errorOccured": true,
            "message": "current item not found",
            "status": 404,
            "data": null
        }
     */

     // required path params : itemId
    // required body/header/query param : authToken
    app.put(`${baseUrl}/:itemId/redoAction`, auth.isAuthenticated, controller.redoAction);



    /**
     * @api {post} List redoAction - for redoing the most recent action
     * @apiVersion 1.0.0
     * @apiGroup list
     *
     * @apiParam {String} authToken authToken of the user creating the item to be passed as body/path/query/header param
     * @apiParam {String} itemId itemId of the item to be passed as path parameter
     * 
     *  @apiSuccessExample {json} Success-Response: 
     * {
            "errorOccured": false,
            "message": "redo successfull",
            "status": 200
        }
     * 
     * @apiErrorExample {json} Error- Response:
     * {
     * "errorOccurred": true,
        "message": "error updating current version", 
        "status": 500,
        "data": "error data"
     * }
     *  
     * @apiErrorExample {json} Error- Response:
     * {
            "errorOccured": true,
            "message": "current item not found",
            "status": 404,
            "data": null
        }
     */


}

module.exports = {
    setRouter : setRouter
}