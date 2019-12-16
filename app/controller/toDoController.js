const express = require('express');
const mongoose = require('mongoose');

// importing libs and modules
const check = require('../libs/checkLib');
const logger = require('../libs/loggerLib');
const response = require('../libs/responseLib');
const time = require('../libs/timeLib');
const validateInput = require('../libs/validateInputLib');
const shortid = require('shortid');

// importing models
const AuthModel = mongoose.model('Auth');
const UserModel = mongoose.model('User');
const ListModel = mongoose.model('List');
const ItemModel = mongoose.model('Item');



// error handler to make a list visible 
let makeEditedVersionVisible = (list) => {
    let updateObj = {
        listNextId: list.listNextId,
        listIsHidden: list.listIsHidden
    }
    ListModel.update({ listId: list.listId}, updateObj, { multi: true }, (err, result) => {
        if (err) {
            logger.error("error updating existing list to deprecated version for editing", "toDoController : editList - makeEditedVersionVisible()", 9);
        } else if (result.n == 0) {
            logger.error("list not found for editing", "toDoController : editList - makeEditedVersionVisible()", 9);
        } else {
            logger.info("on error making the edited version to visible", "editList - makeEditedVersionVisible()", 9);
        }
    });
}

//error handler to delete new version that is redundant
let deleteNewVersion = (newListId) => {
    ListModel.remove({ listId: newListId }, (err, result) => {
        if (err) {
            logger.error("error deleting new list on error", "toDoController : editList - deleteNewVersion()", 9);
        } else if (result.n == 0) {
            logger.error("new list not found for deleting", "toDoController : editList - deleteNewVersion()", 9);
        } else {
            logger.info("on error deleting a new version list", "editList - deleteNewVersion()", 9);
        }
    })
}



// function to create a new list
let createNewList = (req, res) => {

    // checking if input requirements are met if the given title already exists with status open
    let validateInputParams = () => {
        return new Promise((resolve, reject) => {

            if (req.body.listTitle) {
                let queryObj = {
                    listTitle: req.body.listTitle,
                    listOwner: req.body.listOwner,
                    listIsHidden : false
                }
                ListModel.findOne(queryObj, (err, result) => {
                    if (err) {
                        logger.error("error finding if the given title exists", "toDoController : createNewList - validateInputParams", 9);
                        let apiResponse = response.generate(true, "internal DB error", 500, err);
                        reject(apiResponse);
                    } else if (check.isEmpty(result)) {
                        resolve();
                    } else {
                        if (result.listStatus == 'open') {
                            logger.error("given title exists and is still open", "toDoController : createNewList - validateInputParams", 9);
                            let apiResponse = response.generate(true, "given title already exists is still open - please add item to the list", 400, null);
                            reject(apiResponse);
                        } else {
                            resolve();
                        }
                    }
                })

            } else {
                logger.error("list title not provided", "toDoController : createNewList - validateInputParams", 9);
                let apiResponse = response.generate(true, "title of the list not provided", 400, null)
                reject(apiResponse);
            }

        })

    }

    let createList = () => {
        return new Promise((resolve, reject) => {
            console.log(req.body);
            let newToDoList = new ListModel({
                listTitle: req.body.listTitle,
                listOwner: req.body.listOwner,
                listDescription: req.body.listDescription || '',
                listId: shortid.generate(),
                listStatus: 'open',
                listCreatedOn: Date.now()
            })
            newToDoList.save((err, result) => {
                if (err) {
                    logger.error("error saving new list to DB", "toDoController : createNewList - createList", 9);
                    let apiResponse = response.generate(true, "error saving new list to DB", 500, err);
                    reject(apiResponse);
                } else {
                    logger.info("list created successfully", "toDoController : createNewList - createList")
                    let listDetails = result.toObject()
                    delete listDetails._id;
                    delete listDetails.__v;

                    resolve(listDetails);
                }
            })
        })
    }

    validateInputParams()
        .then(createList)
        .then((resolve) => {
            let apiResponse = response.generate(false, "success creating new list", 200, resolve);
            res.send(apiResponse);
        })
        .catch((error) => {
            res.send(error);
        })

}
// end of create new list function


// create new Item in list function
// requires listId, title, description(optional), userId, dueDate, parent(optional)
let createNewItem = (req, res) => {

    let validateInputParams = () => {
        return new Promise((resolve, reject) => {
            if (req.body.listId && req.body.title) {

                let findQuery = {
                    $and: [
                        { listId: req.body.listId },
                        { title: req.body.title },
                        { status: "open" },
                        { isHidden: "false" }
                    ]
                }
                ItemModel.findOne(findQuery, (err, result) => {
                    if (err) {
                        logger.error("error retreiving itemDetails from DB", "toDoController : createNewItem - validateInputParams", 9);
                        let apiResponse = response.generate(true, "error retreiving itemDetails from DB", 500, err);
                        reject(apiResponse);
                    } else if (check.isEmpty(result)) {
                        resolve()
                    } else {
                        logger.error("a list item with given title exists on the list", "toDoController : createNewItem - validateInputParams", 9);
                        let apiResponse = response.generate(true, "a list item with the given name exists on the given list", 400, null);
                        reject(apiResponse);
                    }
                })

            } else {
                logger.error("listId or listTitle of the list not provided", "toDoController : createNewItem - validateInputParams", 9);
                let apiResponse = response.generate(true, "listId or listTitle of the list not provided", 400, null)
                reject(apiResponse);
            }


        })
    }

    let createNewItem = () => {
        return new Promise((resolve, reject) => {
            let newItem = new ItemModel({
                listId: req.body.listId,
                title: req.body.title,
                description: req.body.description || '',
                itemId: shortid.generate(),
                owner: req.user.userId,
                createdOn: Date.now(),
                dueDate: req.body.dueDate,
                parent: req.body.parent  //for sub-todo-list
            })
            newItem.save((err, result) => {
                if (err) {
                    logger.error("error saving new item to DB", "toDoController : createNewList - createList", 9);
                    let apiResponse = response.generate(true, "error saving new item to DB", 500, err);
                    reject(apiResponse);
                } else {
                    logger.info("new item saved to DB", "toDoController : createNewList - createList", 9);
                    let newItemDetails = result.toObject();
                    delete newItemDetails.__v;
                    delete newItemDetails._id;
                    resolve(newItemDetails);
                }
            })
        })
    }


    validateInputParams()
        .then(createNewItem)
        .then((resolve) => {
            let apiResponse = response.generate(false, "success creating new item", 200, resolve);
            res.send(apiResponse);
        })
        .catch((error) => {
            res.send(error);
        })
}
// end of create new item


//function to edit existing item
// it needs userId, itemId, 
// title, description, dueDate are options for editing
let editItem = (req, res) => {

    // used for verifying the input and checking if item with given properties exists on DB
    let validateInputParams = () => {
        return new Promise((resolve, reject) => {

            ItemModel.findOne({ itemId: req.body.itemId }, (err, result) => {
                if (err) {
                    logger.error("error retreiving existing item details", "toDoController : editItem - validateInputParams", 9);
                    let apiResponse = response.generate(true, "error retreiving existing item details", 500, err);
                    reject(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.error("item does not exist", "toDoController : editItem - validateInputParams", 9);
                    let apiResponse = response.generate(true, "item does not exist", 404, null);
                    reject(apiResponse);
                } else {
                    let itemDetails = result.toObject();
                    resolve(itemDetails);
                }
            })

        })
    }

    //creating a new item with new Id with provided updates to be presented as edited item
    let editExistingItem = (itemDetails) => {
        console.log(itemDetails);
        return new Promise((resolve, reject) => {
            let editedItem = new ItemModel({
                listId: itemDetails.listId,
                title: (!check.isEmpty(req.body.title)) ? req.body.title : itemDetails.title,
                description: (!check.isEmpty(req.body.description)) ? req.body.description : itemDetails.description,
                itemId: shortid.generate(),
                previousId: itemDetails.itemId,
                owner: itemDetails.owner,
                createdOn: itemDetails.createdOn,
                dueDate: (!check.isEmpty(req.body.dueDate)) ? req.body.dueDate : itemDetails.dueDate,
                modifiedBy: req.user.userId,
                modifiedOn: Date.now(),
                parent: itemDetails.parent,
                children: itemDetails.children,
                status: itemDetails.status,
                isHidden: false,
                isPrivate: itemDetails.isPrivate,
                privilegedAuthorId: itemDetails.privilegedAuthorId
            })
            editedItem.save((err, result) => {
                if (err) {
                    logger.error("error saving edit item", "toDoController : editItem - editExistingItem", 9);
                    let apiResponse = response.generate(true, "DB error while saving edited item", 500, err);
                    reject(apiResponse);
                } else {

                    logger.info("successfully saved edited item", "toDoController : editItem - editExistingItem", 9);
                    let editedItem = result.toObject();
                    delete editedItem.__v;
                    delete editedItem._id;
                    resolve(editedItem);
                }
            })
        })
    }


    // updating existing item to hidden for display purposes
    let updateExistingItem = (editedItem) => {
        return new Promise((resolve, reject) => {
            let updating = { isHidden: true, nextId: editedItem.itemId };
            ItemModel.update({ itemId: req.body.itemId }, updating, { multi: true }, (err, result) => {
                if (err) {
                    logger.error("error updating existing item details", "toDoController : editItem - updateExistingItem", 9);
                    let apiResponse = response.generate(true, "error updating existing item details", 500, err);
                    reject(apiResponse);
                } else if (result.n == 0) {
                    logger.error("item does not exist", "toDoController : editItem - updateExistingItem", 9);
                    let apiResponse = response.generate(true, "item does not exist", 404, null);
                    reject(apiResponse);
                } else {
                    console.log(result)
                    resolve(editedItem);
                }
            })

        })
    }

    validateInputParams()
        .then(editExistingItem)
        .then(updateExistingItem)
        .then((resolve) => {
            let apiResponse = response.generate(false, "edit success", 200, resolve);
            res.send(apiResponse);
        })
        .catch((error) => {
            res.send(error);
        })



}
// end of edit item function


// edit list function
// requires listId as body parameter
// optional editing properties like title, description should be passed as body parameters
let editList = (req, res) => {

    
    

 

    //editing the existing list to a deprecated version for undo and redo purposes
    let editExistingList = () => {
        return new Promise((resolve, reject) => {
            if (req.body.listId) {
                let updateObj = {
                    listNextId: shortid.generate(),
                    listIsHidden: true
                }
                ListModel.update({ listId: req.body.listId }, updateObj, { multi: true }, (err, result) => {
                    if (err) {
                        logger.error("error updating existing list to deprecated version for editing", "toDoController : editList - editExistingList", 9);
                        let apiResponse = response.generate(true, "error updating existing list to deprecated version for editing", 500, err);
                        reject(apiResponse);
                    } else if (result.n == 0) {
                        logger.error("list not found for editing", "toDoController : editList - editExistingList", 9);
                        let apiResponse = response.generate(true, "no list found for editing", 404, null);
                        reject(apiResponse);
                    } else {
                        logger.info("success updating existing list to deprecated version for editing", "editList - editExistingList", 9);
                        
                        resolve();
                    }
                })

            } else {
                logger.error("listId to be edited is not provided", "toDoController : editList - updateItems", 9);
                let apiResponse = response.generate(true, "listId to be deleted is not provided", 400, null);
                reject(apiResponse);
            }
        })
    }

    // creating a newList with edited properties to emulate editing 
    let createNewEditedVersion = ()=>{
        console.log("createNewEditedVersion1")
        return new Promise((resolve, reject) => {
            console.log("createNewEditedVersion2")
            console.log(req.body.listId)
            let queryObj = {
                listId : req.body.listId
            }
            ListModel.findOne(queryObj, (err, result)=>{
                console.log("createNewEditedVersion3")
                if (err) {
                    logger.error("error searching for recent deprecated version for editing", "toDoController : editList - createNewEditedVersion", 9);
                    let apiResponse = response.generate(true, "error searching for recent deprecated version for editing", 500, err);
                    reject(apiResponse);
                } else {
                    let createNewList = new ListModel({
                        listTitle: (!check.isEmpty(req.body.listTitle)) ? req.body.listTitle : result.listTitle,
                        listOwner : result.listOwner,
                        listDescription: (!check.isEmpty(req.body.listDescription)) ? req.body.listDescription : result.listDescription,
                        listId: result.listNextId,
                        listCreatedOn : result.CreatedOn,
                        listStatus : (!check.isEmpty(req.body.listStatus))?req.body.listStatus:result.listStatus,
                        listPreviousId: req.body.listId,
                        listIsHidden : (!check.isEmpty(req.body.listIsHidden))?req.body.listIsHidden:result.listIsHidden,
                        listNextId : '',
                        listModifiedBy: req.user.userId,
                        listModifiedOn : Date.now()
                    })
                    createNewList.save((err, result) => {
                        if (err) {
                            logger.error("error creating a new edited version list for existing list", "toDoController : editList - createNewEditedList", 9);
                            let apiResponse = response.generate(true, "error creating a new list for edited list", 500, err);
                            reject(apiResponse);
                        } else {
                            logger.info("new edited version of existing list created", "toDoController : editList - createNewEditedList", 9);
                            let newListVersion = result.toObject();
                            delete newListVersion.__v;
                            delete newListVersion._id;
                            resolve(newListVersion);
                        }
                    })
                }
            })
        })
    }

    // updating the items with new listId
    let updateItemsToNewList = (newListVersion) => {
        return new Promise((resolve, reject) => {
                ItemModel.update({ listId: req.body.listId}, { listId: newListVersion.listId }, { multi: true }, (err, result) => {
                    if (err) {

                        logger.error("error updating the list-items with details of list edit", "toDoController : editList - updateItems", 9);
                        let list = {
                            listId : req.body.listId,
                            listNextId : newListVersion.listId,
                            listIsHidden : false
                        }
                        makeEditedVersionVisible(list);
                        deleteNewVersion(newListVersion.listId);
                                                
                        let apiResponse = response.generate(true, "error while updating the list-items with detaild of list edit", 500, err);
                        reject(apiResponse)
                    } else {
                        console.log(newListVersion);
                        resolve(newListVersion);
                    }
                })            
        })
    }

    
    

    editExistingList()
    .then(createNewEditedVersion)
    .then(updateItemsToNewList)
    .then((resolve)=>{
        let apiResponse = response.generate(false, "list update success", 200, resolve);
        res.send(apiResponse);
    })
    .catch((error)=>{
        res.send(error);
    })




    //----------------without undo option--------------------------------------------------
    // if (req.body.listId) {
    //     let updateOptions = {
    //         listTitle: req.body.listTitle,
    //         listDescription: req.body.listDescription
    //     }
    //     ListModel.update({ listId: req.body.listId }, updateOptions, { multi: true }, (err, result) => {
    //         if (err) {
    //             logger.error("error editing list", "toDoController : editList", 9);
    //             let apiResponse = response.generate(true, "error editing list", 500, err);
    //             res.send(apiResponse);
    //         } else if (result.n == 0) {
    //             logger.error("list not found", "toDoController : editList", 9);
    //             let apiResponse = response.generate(true, "list not found", 404, null);
    //             res.send(apiResponse);
    //         } else {
    //             logger.info("list edited successfully", "toDoController : editList", 9);
    //             let apiResponse = response.generate(false, "list edited successfully", 200, result);
    //             res.send(apiResponse);
    //         }
    //     })
    // } else {
    //     logger.error("listId to be edited is not provided", "toDoController : editList", 9);
    //     let apiResponse = response.generate(true, "listId to be deleted is not provided", 400, null);
    //     res.send(apiResponse);
    // } 
    //---------------------------------------------------------------------------------------
}
// complete edit list function



// delete item function
//takes itemId as a path param
let deleteItem = (req, res) => {
    if (req.body.itemId) {

        ItemModel.remove({ itemId: req.body.itemId }, (err, result) => {
            if (err) {
                logger.error("error deleting item", "toDoController : deleteItem", 9);
                let apiResponse = response.generate(true, "error deleting item", 500, err);
                res.send(apiResponse)
            } else if (result.n == 0) {
                logger.error("item not found", "toDoController : deleteItem", 9);
                let apiResponse = response.generate(true, "item not found", 404, null);
                res.send(apiResponse);
            } else {
                logger.info("item deleted successfully", "toDoController : deleteItem", 9);
                let apiResponse = response.generate(false, "item deleted successfully", 200, result);
                res.send(apiResponse);
            }
        })
    } else {
        logger.error("itemID of the item to be deleted not provided", "toDoController : deleteItem", 9);
        let apiResponse = response.generate(true, "itemID of the item to be deleted not provided", 400, null);
        res.send(apiResponse);
    }
}
// end of delete item function


// delete list function 
// it takes listId as a path param
let deleteList = (req, res) => {

    // deleting the list items first before deleting the list
    let deleteListItems = () => {
        return new Promise((resolve, reject) => {
            if (req.body.listId) {
                ItemModel.remove({ listId: req.body.listId }, (err, result) => {
                    if (err) {
                        logger.error("error deleting the list items", "toDoController : deleteList - deleteListItems", 9);
                        let apiResponse = response.generate(true, "error deleting the list items", 500, err);
                        reject(apiResponse);
                    } else {
                        logger.info("list items deleted successfully", "toDoController : deleteList - deleteListItems", 9);
                        resolve();
                    }
                })
            } else {
                logger.error("listId for the list to be deleted not provided", "toDoController : deleteList- deletingList", 9);
                let apiResponse = response.generate(true, "listId of the list to be deleted not provided", 400, null);
                reject(apiResponse);
            }

        })
    }

    let deletingList = () => {
        return new Promise((resolve, reject) => {
            ListModel.remove({ listId: req.body.listId }, (err, result) => {
                if (err) {
                    logger.error("error deleting list", "toDoController : deleteList - deleteListItems", 9);
                    let apiResponse = response.generate(true, "error deleting list", 500, err);
                    reject(apiResponse);
                } else if (result.n == 0) {
                    logger.error("list not found", "toDoController : deleteList - deletingList", 9);
                    let apiResponse = response.generate(true, "list not found", 404, null);
                    reject(apiResponse)
                } else {
                    logger.info("list deleted successfully", "toDoContoller : deleteList - deletingList", 9);
                    resolve(result);
                }
            })

        })

    }

    deleteListItems()
        .then(deletingList)
        .then((resolve) => {
            let apiResponse = response.generate(false, "list deleted successfully", 200, resolve);
            res.send(apiResponse);
        })
        .catch((error) => {
            res.send(error);
        })

}
// end of deleteList function

//get users all lists
// requires userId as a body parameter
// requires skip value as body paramter - optional
let getUserAllLists = (req, res) => {
    if (req.body.userId) {
        ListModel.find({ listOwner: req.body.userId })
            .select('-__v -_id')
            .skip(parseInt(req.body.skip) || 0)
            .lean()
            .limit(10)
            .exec((err, result) => {
                if (err) {
                    logger.error("error retreiving lists of the user", "toDoController : getUserAllLists", 9);
                    let apiResponse = response.generate(true, "error retreiving lists of the user", 500, err);
                    res.send(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.error("user's lists not found", "toDoController : getUserAllLists", 9);
                    let apiResponse = response.generate(true, "user's list not found", 404, null);
                    res.send(apiResponse);
                } else {
                    logger.info("user lists found", "toDoController - getUserAllLists", 9);
                    let apiResponse = response.generate(false, "user lists found", 200, result);
                    res.send(apiResponse);
                }
            })
    } else {
        logger.error("userId of the list owner not provided", "toDoController : getUserAllLists", 9);
        let apiResponse = response.generate(true, "userId of the list owner not provided", 400, null);
        res.send(apiResponse);
    }

}
// end of get user's all lists function


// get list details
// requires listId as a body parameter
let getListDetails =(req, res)=>{
    if(req.body.listId){
        ListModel.findOne({listId : req.body.listId})
        .select('-__v -_id')
        .lean()
        .exec((err, result)=>{
            if (err) {
                logger.error("error retreivingt list", "toDoController : getlistDetails", 9);
                let apiResponse = response.generate(true, "error retreiving the list", 500, err);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                logger.error("list not found", "toDoController : getlistDetails", 9);
                let apiResponse = response.generate(true, "list not found", 404, null);
                res.send(apiResponse);
            } else {
                logger.info("list found", "toDoController - getlistDetails", 9);
                let apiResponse = response.generate(false, "list found", 200, result);
                res.send(apiResponse);
            }
        })
    }
    }

    // get list details
// requires listId as a body parameter
let getItemDetails =(req, res)=>{
    console.log()
    if(req.body.itemId){
        ItemModel.findOne({itemId: req.body.itemId})
        .select('-__v -_id')
        .lean()
        .exec((err, result)=>{
            if (err) {
                logger.error("error retreiving the item", "toDoController : getItemDetails", 9);
                let apiResponse = response.generate(true, "error retreiving item", 500, err);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                logger.error("item not found", "toDoController : getItemDetails", 9);
                let apiResponse = response.generate(true, "item not found", 404, null);
                res.send(apiResponse);
            } else {
                logger.info("item found", "toDoController - getItemDetails", 9);
                let apiResponse = response.generate(false, "item found", 200, result);
                res.send(apiResponse);
            }
        })
    }else {
        logger.error("itemId not provided", "toDoController : getItemDetails", 9);
        let apiResponse = response.generate(true, "itemId not provided", 400, null);
        res.send(apiResponse);
    }
    }




// get all items of list 
// requires userId as a body parameter
// requires skip value as body paramter - optional
let getAllListItems = (req, res) => {
    if (req.body.listId) {
        ItemModel.find({ listId: req.body.listId, isHidden: false, status : req.body.status })
            .select('-__v -_id')
            .skip(parseInt(req.body.skip) || 0)
            .lean()
            .limit(10)
            .exec((err, result) => {
                if (err) {
                    logger.error("error retreiving items of the list", "toDoController : getAllListItems", 9);
                    let apiResponse = response.generate(true, "error retreiving items of the list", 500, err);
                    res.send(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.error("list's items not found", "toDoController : getAllListItems", 9);
                    let apiResponse = response.generate(true, "list's items not found", 404, null);
                    res.send(apiResponse);
                } else {
                    logger.info("list items found", "toDoController - getAllListItems", 9);
                    let apiResponse = response.generate(false, "list items found", 200, result);
                    res.send(apiResponse);
                }
            })
    } else {
        logger.error("listId for the items required not provided", "toDoController : getAllListItems", 9);
        let apiResponse = response.generate(true, "listId for teh items required not provided", 400, null);
        res.send(apiResponse);
    }

}

//mark item as done.
// it takes itemId as a body param
let markItemAsDone = (req, res) => {
    if (req.body.itemId) {
        let updatingValue = { status: "done" };
        ItemModel.update({ itemId: req.body.itemId }, updatingValue, { multi: true }, (err, result) => {
            if (err) {
                logger.error("error upadting the status as done", "toDoController : markItemAsDone", 9);
                let apiResponse = response.generate(true, "error updating the status as done", 500, err);
                res.send(apiResponse);
            } else if (result.n == 0) {
                logger.error("no item of given itemId available to mark as done", "toDoController : markItemAsDone", 9);
                let apiResponse = response.generate(true, "no item of given itemId found to mark as done", 404, null);
                res.send(apiResponse);
            } else {
                logger.info("item marked as done", "toDoController : markItemAsDone", 9);
                let apiResponse = response.generate(false, "item marked as done", 200, result);
                res.send(apiResponse);
            }
        })
    }else{
        logger.error("itemId not provided to make changes", "toDoController : markItemAsDone", 9);
        let apiResponse = response.generate(true, "itemId not provided to make changes", 400, null);
        res.send(apiResponse);
    }
}
// end of markItemAsDone




//mark item as open.
// it takes itemId as a body param
let markItemAsOpen = (req, res) => {
    if (req.body.itemId) {
        let updatingValue = { status: "open" };
        ItemModel.update({ itemId: req.body.itemId }, updatingValue, { multi: true }, (err, result) => {
            if (err) {
                logger.error("error upadting the status as open", "toDoController : markItemAsOpen", 9);
                let apiResponse = response.generate(true, "error updating the status as open", 500, err);
                res.send(apiResponse);
            } else if (result.n == 0) {
                logger.error("no item of given itemId available to mark as open", "toDoController : markItemAsOpen", 9);
                let apiResponse = response.generate(true, "no item of given itemId found to mark as open", 404, null);
                res.send(apiResponse);
            } else {
                logger.info("item marked as open", "toDoController : markItemAsOpen", 9);
                let apiResponse = response.generate(false, "item marked as open", 200, result);
                res.send(apiResponse);
            }
        })
    }else{
        logger.error("itemId not provided to make changes", "toDoController : markItemAsOpen", 9);
        let apiResponse = response.generate(true, "itemId not provided to make changes", 400, null);
        res.send(apiResponse);
    }
}
// end of markItemAsOpen



//mark list as done.
// it takes itemId as a body param
let markListAsDone = (req, res) => {
    if (req.body.listId) {
        console.log(req.body);
        let updatingValue = { listStatus: "done" };
        ListModel.update({ listId : req.body.listId }, updatingValue, { multi: true }, (err, result) => {
            if (err) {
                logger.error("error upadting the status as done", "toDoController : markListAsDone", 9);
                let apiResponse = response.generate(true, "error updating the status as done", 500, err);
                res.send(apiResponse);
            } else if (result.n == 0) {
                logger.error("no list of given list available to mark as done", "toDoController : markListAsDone", 9);
                let apiResponse = response.generate(true, "no list of given list found to mark as done", 404, null);
                res.send(apiResponse);
            } else {
                logger.info("list marked as done", "toDoController : markListAsDone", 9);
                let apiResponse = response.generate(false, "list done", 200, result);
                res.send(apiResponse);
            }
        })
    }else{
        logger.error("listId not provided to make changes", "toDoController : markListAsDone", 9);
        let apiResponse = response.generate(true, "listId not provided to make changes", 400, null);
        res.send(apiResponse);
    }
}
// end of markItemAsDone




//mark item as open.
// it takes itemId as a body param
let markListAsOpen = (req, res) => {
    if (req.body.listId) {
        let updatingValue = { listStatus: "open" };
        ListModel.update({ listId: req.body.listId }, updatingValue, { multi: true }, (err, result) => {
            if (err) {
                logger.error("error upadting the status as open", "toDoController : markListAsOpen", 9);
                let apiResponse = response.generate(true, "error updating the status as open", 500, err);
                res.send(apiResponse);
            } else if (result.n == 0) {
                logger.error("no list of given listId available to mark as open", "toDoController : markListAsOpen", 9);
                let apiResponse = response.generate(true, "no list of given listId found to mark as open", 404, null);
                res.send(apiResponse);
            } else {
                logger.info("list marked as open", "toDoController : markListAsOpen", 9);
                let apiResponse = response.generate(false, "item open", 200, result);
                res.send(apiResponse);
            }
        })
    }else{
        logger.error("listId not provided to make changes", "toDoController : markListAsDone", 9);
        let apiResponse = response.generate(true, "listId not provided to make changes", 400, null);
        res.send(apiResponse);
    }
}
// end of markItemAsOpen




//undo action on item function 
let undoAction = (req, res) => {

    // updating previous version of the item to hidden : false to make it visible
    // requires current version itemId as path parameter
    let updatePreviousVersion = () => {
        return new Promise((resolve, reject) => {
            if (req.body.itemId) {
                ItemModel.update({ nextId: req.body.itemId }, { isHidden: false }, { multi: true }, (err, result) => {
                    if (err) {
                        logger.error("error updating previous version", "toDoController : undoAction - updatePreviousVersion", 9);
                        let apiResponse = response.generate(true, "error updating previous version", 500, err);
                        reject(apiResponse);
                    } else if (result.n == 0) {
                        logger.error("no previous version found", "toDoController : undoAction - updatePreviousVersion", 9);
                        let apiResponse = response.generate(true, "previous version not found", 404, null);
                        reject(apiResponse);
                    } else {
                        resolve()
                    }
                })
            } else {
                logger.error("itemId of the item not provided", "toDoController : undoAction - updatePreviousVersion", 9);
                let apiResponse = response.generate(true, "itemId of the item not provided", 400, null);
                reject(apiResponse);
            }
        })
    }

    // updating current version to hidden : true
    let updateCurrentVersion = () => {
        return new Promise((resolve, reject) => {
            ItemModel.update({ itemId: req.body.itemId }, { isHidden: true }, { multi: true }, (err, result) => {
                if (err) {
                    logger.error("error updating current version", "toDoController : undoAction - updateCurrentVersion", 9);
                    let apiResponse = response.generate(true, "error updating current version", 500, err);
                    reject(apiResponse);
                } else if (result.n == 0) {
                    logger.error("current item not found", "toDoController : undoAction - updateCurrentVersion", 9);
                    let apiResponse = response.generate(true, "current item not found", 404, null);
                    reject(apiResponse);
                } else {
                    resolve();
                }
            })
        })
    }


    updatePreviousVersion()
        .then(updateCurrentVersion)
        .then((resolve) => {
            let apiResponse = response.generate(false, "undo successfull", 200, resolve);
            res.send(apiResponse);
        })
        .catch((error) => {
            res.send(error);
        })

}
// complete undo function




//redo function for item
let redoAction = (req, res) => {

    // updating previous version of the item to hidden : false to make it visible
    // requires current version itemId as path parameter
    let updateNextVersion = () => {
        return new Promise((resolve, reject) => {
            if (req.body.itemId) {
                ItemModel.update({ previousId: req.body.itemId }, { isHidden: false }, { multi: true }, (err, result) => {
                    if (err) {
                        logger.error("error updating next version", "toDoController : redoAction - updateNextVersion", 9);
                        let apiResponse = response.generate(true, "error updating next version", 500, err);
                        reject(apiResponse);
                    } else if (result.n == 0) {
                        logger.error("no next version found", "toDoController : redoAction - updateNextVersion", 9);
                        let apiResponse = response.generate(true, "next version not found", 404, null);
                        reject(apiResponse);
                    } else {
                        resolve()
                    }
                })
            } else {
                logger.error("itemId of the item not provided", "toDoController : redoAction - updatePreviousVersion", 9);
                let apiResponse = response.generate(true, "itemId of the item not provided", 400, null);
                reject(apiResponse);
            }
        })
    }

    // updating current version to hidden : true
    let updateCurrentVersion = () => {
        return new Promise((resolve, reject) => {
            ItemModel.update({ itemId: req.body.itemId }, { isHidden: true }, { multi: true }, (err, result) => {
                if (err) {
                    logger.error("error updating current version", "toDoController : redoAction - updateCurrentVersion", 9);
                    let apiResponse = response.generate(true, "error updating current version", 500, err);
                    reject(apiResponse);
                } else if (result.n == 0) {
                    logger.error("current item not found", "toDoController : redoAction - updateCurrentVersion", 9);
                    let apiResponse = response.generate(true, "current item not found", 404, null);
                    reject(apiResponse);
                } else {
                    resolve();
                }
            })
        })
    }


    updateNextVersion()
        .then(updateCurrentVersion)
        .then((resolve) => {
            let apiResponse = response.generate(false, "redo successfull", 200, resolve);
            res.send(apiResponse);
        })
        .catch((error) => {
            res.send(error);
        })

}
// complete redo function



// undo action on list function 
let undoListAction = (req, res)=>{

    let updatePreviousVersion =()=>{
        return new Promise((resolve, reject)=>{
            if(req.body.listId){
                ListModel.findOneAndUpdate({listNextId : req.body.listId}, {listIsHidden : false}, (err, result)=>{
                    if(err){
                        logger.error("error reverting to the previous version", "toDoController : undoListAction", 9);
                        let apiResponse = response.generate(true, "error reverting to the previous version", 500, err);
                        reject(apiResponse);
                    }else if(check.isEmpty(result)){
                        logger.error("no version to revert found", "toDoController : UndoListAction - updatePreviousVersion", 9);
                        let apiResponse = response.generate(true, "list version to revert to not found", 404, null);
                        reject(apiResponse);
                    }else{
                        logger.info("updated the previous version to visible", "toDoController : undoListAction - updatePreviousVersion", 9);
                        let undoVersionDetails = result.toObject();
                        resolve(undoVersionDetails);
                    }
                })
            }else{
                logger.error("list id of the undo action not provided", "toDoController : undoListAction - updatePreviousVersion", 9);
                let apiResponse = response.generate(true, " list id of the undo action not provided", 400, null);
                reject(apiResponse);
            }
        })
        
    }


    let updateListItems = (undoVersionDetails)=>{
        console.log("updateListItems1")
        return new Promise((resolve, reject)=>{
            console.log("updateListItems2")
            console.log(undoVersionDetails);
            
                console.log("updateListItems3")
                let queryObj = {
                    listId : undoVersionDetails.listId,
                    listIsHidden : false
                }
                ItemModel.update(queryObj, {listId : undoVersionDetails.listId}, {multi : true}, (err, result)=>{
                    if(err){
                        logger.error("error updating items to new list", " toDoController : undoListAction - updateListItems", 9);
                        let list = {
                            listId : undoVersionDetails.listId,
                            listNextId : req.body.listId,
                            listIsHidden : true
                        }
                        makeEditedVersionVisible(list);
                        let apiResponse = response.generate(true, " error updating items to new list", 500, err);
                        reject(apiResponse);
                    }else {
                        logger.info("updated items of the list", "toDoController - undoListAction - updateListItems", 9);
                        resolve();
                    }
                })
                      
        })
    }

    let updateCurrentVersion = ()=>{
        return new Promise((resolve, reject)=>{
            ListModel.update({listId : req.body.listId}, {listIsHidden : true}, (err, result)=>{
                if(err){
                    logger.error("error updating current list version", "toDoController : undoListAction - updateCurrentVersion", 9);
                    let apiResponse = response.generate(true, "error updating current list version", 500, err);
                    reject(apiResponse);
                }else if(result.n == 0){
                    logger.error("current version not found", "toDoController - undoListAction - updateCurrentVersion", 9);
                    let apiResponse = response.generate(true, "current version not found", 404, null);
                    reject(apiResponse);
                }else {
                    resolve();
                }
            })
        })
    }


    updatePreviousVersion()
    .then(updateListItems)
    .then(updateCurrentVersion)
    .then((resolve)=>{
        let apiResponse = response.generate(false, "undo list action successful", 200, resolve);
        res.send(apiResponse);
    })
    .catch((error)=>{
        res.send(error);
    })

}



// undo action on list function 
let redoListAction = (req, res)=>{

    let updateNextVersion =()=>{
        return new Promise((resolve, reject)=>{
            if(req.body.listId){
                ListModel.findOneAndUpdate({listPreviousId : req.body.listId}, {listIsHidden : false}, (err, result)=>{
                    if(err){
                        logger.error("error reverting to the next version", "toDoController : redoListAction", 9);
                        let apiResponse = response.generate(true, "error reverting to the previous version", 500, err);
                        reject(apiResponse);
                    }else if(check.isEmpty(result)){
                        logger.error("no version to revert to found", "toDoController : redoListAction - updateNextVersion", 9);
                        let apiResponse = response.generate(true, "list version to revert to not found", 404, null);
                        reject(apiResponse);
                    }else{
                        logger.info("updated the next version to visible", "toDoController : redoListAction - updateNextVersion", 9);
                        let redoVersionDetails = result.toObject();
                        resolve(redoVersionDetails);
                    }
                })
            }else{
                logger.error("list id of the undo action not provided", "toDoController : redoListAction - updateNextVersion", 9);
                let apiResponse = response.generate(true, " list id of the redo action not provided", 400, null);
                reject(apiResponse);
            }
        })
        
    }


    let updateListItems = (redoVersionDetails)=>{
        return new Promise((resolve, reject)=>{
            
                let queryObj = {
                    listId : redoVersionDetails.listId,
                    listIsHidden : false
                }
                ItemModel.update(queryObj, {listId : redoVersionDetails.listId}, {multi : true}, (err, result)=>{
                    if(err){
                        logger.error("error updating items to new list", " toDoController : redoListAction - updateListItems", 9);
                        let list = {
                            listId : redoVersionDetails.listId,
                            listNextId : redoVersionDetails.listNextId,
                            listIsHidden : true
                        }
                        makeEditedVersionVisible(list);
                        let apiResponse = response.generate(true, " error updating items to new list", 500, err);
                        reject(apiResponse);
                    }else {
                        logger.info("updated items of the list", "toDoController - redoListAction - updateListItems", 9);
                        resolve();
                    }
                })
        })
    }

    let updateCurrentVersion = ()=>{
        return new Promise((resolve, reject)=>{
            ListModel.update({listId : req.body.listId}, {listIsHidden : true}, (err, result)=>{
                if(err){
                    logger.error("error updating current list version", "toDoController : redoListAction - updateCurrentVersion", 9);
                    let apiResponse = response.generate(true, "error updating current list version", 500, err);
                    reject(apiResponse);
                }else if(result.n == 0){
                    logger.error("current version not found", "toDoController - redoListAction - updateCurrentVersion", 9);
                    let apiResponse = response.generate(true, "current version not found", 404, null);
                    reject(apiResponse);
                }else {
                    resolve();
                }
            })
        })
    }


    updateNextVersion()
    .then(updateListItems)
    .then(updateCurrentVersion)
    .then((resolve)=>{
        let apiResponse = response.generate(false, "redo list action successful", 200, resolve);
        res.send(apiResponse);
    })
    .catch((error)=>{
        res.send(error);
    })

}





// ______________________________________________________________________________________________
// ----------------------test functions ---------------------------------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let deleteTestList = (req, res) => {
    ListModel.remove({ listOwner: req.body.listOwner }, (err, result) => {
        // ToDoModel.find((err, result)=>{ 
        if (err) {
            logger.error("error deleting the list", "toDoController : deleteList", 9);
            let apiResponse = response.generate(true, "error deleting the list", 500, err);
            res.send(apiResponse)
        } else {
            logger.info("deleting the list", "toDoController : deleteList", 9);
            let apiResponse = response.generate(false, "deleting the list", 500, result);
            res.send(apiResponse)
        }
    })
}

let getAllTestLists = (req, res) => {

    ListModel.find((err, result) => {
        if (err) {
            logger.error("error deleting the list", "toDoController : deleteList", 9);
            let apiResponse = response.generate(true, "error deleting the list", 500, err);
            res.send(apiResponse)
        } else {
            logger.info("deleting the list", "toDoController : deleteList", 9);
            let apiResponse = response.generate(false, "deleting the list", 500, result);
            res.send(apiResponse)
        }
    })
}

let deleteTestItem = (req, res) => {
    ItemModel.remove({ listId: req.body.listId }, (err, result) => {
        // ToDoModel.find((err, result)=>{ 
        if (err) {
            logger.error("error deleting the list", "toDoController : deleteList", 9);
            let apiResponse = response.generate(true, "error deleting the list", 500, err);
            res.send(apiResponse)
        } else {
            logger.info("deleting the list", "toDoController : deleteList", 9);
            let apiResponse = response.generate(false, "deleting the list", 500, result);
            res.send(apiResponse)
        }
    })
}

let getAllTestItems = (req, res) => {

    ItemModel.find({listId : req.body.listId},(err, result) => {
        if (err) {
            logger.error("error deleting the list", "toDoController : deleteList", 9);
            let apiResponse = response.generate(true, "error deleting the list", 500, err);
            res.send(apiResponse)
        } else {
            logger.info("deleting the list", "toDoController : deleteList", 9);
            let apiResponse = response.generate(false, "deleting the list", 500, result);
            res.send(apiResponse)
        }
    })
}


module.exports = {
    createNewList: createNewList,
    createNewItem: createNewItem,
    editItem: editItem,
    editList: editList,
    deleteItem: deleteItem,
    deleteList: deleteList,
    getUserAllLists: getUserAllLists,
    getAllListItems: getAllListItems,
    getListDetails : getListDetails,
    getItemDetails : getItemDetails,
    markItemAsDone: markItemAsDone,
    markItemAsOpen: markItemAsOpen,
    undoAction: undoAction,
    redoAction: redoAction,
    undoListAction : undoListAction,
    redoListAction : redoListAction,
    markListAsDone : markListAsDone,
    markListAsOpen : markListAsOpen,

    deleteTestList: deleteTestList,    // test
    getAllTestLists: getAllTestLists,  // test
    deleteTestItem: deleteTestItem,    // test
    getAllTestItems: getAllTestItems,  // test
}