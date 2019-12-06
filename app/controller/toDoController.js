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

// function to create a new list
let createNewList = (req, res)=>{

    // checking if input requirements are met if the given title already exists with status open
    let validateInputParams = ()=>{
        return new Promise((resolve, reject)=>{
            
                if(req.body.listTitle){
                    ListModel.findOne({listTitle : req.body.listTitle}, (err, result)=>{
                        if(err){
                            logger.error("error finding if the given title exists", "toDoController : createNewList - validateInputParams", 9);
                            let apiResponse = response.generate(true, "internal DB error", 500, err);
                            reject(apiResponse);                            
                        }else if(check.isEmpty(result)){
                            resolve();
                        }else{
                            if(result.listStatus == 'open'){
                                logger.error("given title exists and is still open", "toDoController : createNewList - validateInputParams", 9);
                                let apiResponse = response.generate(true, "given title already exists is still open - please add item to the list", 400, null);
                                reject(apiResponse);                              
                            }else{
                                resolve();
                            }
                        }
                    })

                }else{
                    logger.error("list title not provided", "toDoController : createNewList - validateInputParams", 9);
                    let apiResponse = response.generate(true, "title of the list not provided", 400, null)
                    reject(apiResponse);
                }                
            
        })
        
    }

    let createList = ()=>{
        return new Promise((resolve, reject)=>{
            let newToDoList = new ListModel({
                listTitle : req.body.listTitle,
                listOwner : req.user.userId,
                listDescription : req.body.listDescription || '',
                listId : shortid.generate(),
                listStatus : 'open',
                listCreatedOn : Date.now()
            })
            newToDoList.save((err, result)=>{
                if(err){
                    logger.error("error saving new list to DB", "toDoController : createNewList - createList", 9);
                    let apiResponse = response.generate(true, "error saving new list to DB", 500, err);
                    reject(apiResponse);
                }else{
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
    .then((resolve)=>{
        let apiResponse = response.generate(false, "success creating new list", 200, resolve);
        res.send(apiResponse);
    })
    .catch((error)=>{
        res.send(error);
    })

}
// end of create new list function


// create new Item in list function
// requires listId, title, description(optional), userId, dueDate, parent(optional)
let createNewItem = (req, res)=>{
    
    let validateInputParams = ()=>{
        return new Promise((resolve, reject)=>{
            if(req.body.listId && req.body.title){
                
                    let findQuery = {
                        $and : [
                            {listId : req.body.listId},
                            {title : req.body.title},
                            {status : "open"},
                            {isHidden : "false"}
                        ]
                    }
                    ItemModel.findOne(findQuery, (err, result)=>{
                        if(err){
                            logger.error("error retreiving itemDetails from DB", "toDoController : createNewItem - validateInputParams", 9);
                            let apiResponse = response.generate(true, "error retreiving itemDetails from DB", 500, err);
                            reject(apiResponse); 
                        }else if(check.isEmpty(result)){
                            resolve()
                        }else{
                            logger.error("a list item with given title exists on the list", "toDoController : createNewItem - validateInputParams", 9);
                            let apiResponse = response.generate(true, "a list item with the given name exists on the given list", 400, null);
                            reject(apiResponse);                            
                        }
                    })
                
            }else{
                logger.error("listId or listTitle of the list not provided", "toDoController : createNewItem - validateInputParams", 9);
                let apiResponse = response.generate(true, "listId or listTitle of the list not provided", 400, null)
                reject(apiResponse);
            }
            

        })
    }

    let createNewItem = ()=>{
        return new Promise((resolve, reject)=>{
            let newItem = new ItemModel({
                listId : req.body.listId,
                title : req.body.title,
                description : req.body.description || '',
                itemId : shortid.generate(),
                owner : req.user.userId,
                createdOn : Date.now(),
                dueDate : req.body.dueDate,
                parent : req.body.parent  //for sub-todo-list
            })
            newItem.save((err, result)=>{
                if(err){
                    logger.error("error saving new item to DB", "toDoController : createNewList - createList", 9);
                    let apiResponse = response.generate(true, "error saving new item to DB", 500, err);
                    reject(apiResponse);                    
                }else{
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
    .then((resolve)=>{
        let apiResponse = response.generate(false, "success creating new item", 200, resolve);
        res.send(apiResponse); 
    })
    .catch((error)=>{
        res.send(error);
    })
}
// end of create new item


//function to edit existing item
// it needs userId, itemId, 
// title, description, dueDate are options for editing
let editItem = (req, res)=>{

    // used for verifying the input and checking if item with given properties exists on DB
    let validateInputParams = ()=>{
        return new Promise((resolve,reject)=>{
            
                ItemModel.findOne({itemId : req.body.itemId},(err, result)=>{
                    if(err){
                        logger.error("error retreiving existing item details","toDoController : editItem - validateInputParams", 9);
                        let apiResponse = response.generate(true, "error retreiving existing item details", 500, err);
                        reject(apiResponse);
                    }else if(check.isEmpty(result)){
                        logger.error("item does not exist","toDoController : editItem - validateInputParams", 9);
                        let apiResponse = response.generate(true, "item does not exist", 404, null);
                        reject(apiResponse);
                    }else {
                        let itemDetails = result.toObject();
                        resolve(itemDetails);
                    }
                })        
            
        })
    }

    //creating a new item with new Id with provided updates to be presented as edited item
    let editExistingItem = (itemDetails)=>{
        console.log(itemDetails);
        return new Promise((resolve, reject)=>{
            let editedItem = new ItemModel({
                listId : itemDetails.listId,
                title : (req.body.title)?req.body.title:itemDetails.title,
                description : (req.body.description)?req.body.description:itemDetails.description,
                itemId : shortid.generate(),
                previousId : itemDetails.itemId,
                owner : itemDetails.owner,
                createdOn : itemDetails.createdOn,
                dueDate : (req.body.dueDate)?req.body.dueDate:itemDetails.dueDate,
                modifiedBy : req.user.userId,
                modifiedOn : Date.now(),
                parent : itemDetails.parent,
                children : itemDetails.children,
                status : itemDetails.status,
                isHidden : false,
                isPrivate : itemDetails.isPrivate,
                privilegedAuthorId : itemDetails.privilegedAuthorId
            })
            editedItem.save((err, result)=>{
                if(err){
                    logger.error("error saving edit item", "toDoController : editItem - editExistingItem", 9);
                    let apiResponse = response.generate(true, "DB error while saving edited item", 500, err);
                    reject(apiResponse);
                }else{
                    
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
    let updateExistingItem = (editedItem)=>{
        return new Promise((resolve,reject)=>{            
                let updating = {isHidden : true, nextId : editedItem.itemId};
                ItemModel.update({itemId : req.body.itemId}, updating, {multi : true}, (err, result)=>{
                    if(err){
                        logger.error("error updating existing item details","toDoController : editItem - updateExistingItem", 9);
                        let apiResponse = response.generate(true, "error updating existing item details", 500, err);
                        reject(apiResponse);
                    }else if(result.n == 0){
                        logger.error("item does not exist","toDoController : editItem - updateExistingItem", 9);
                        let apiResponse = response.generate(true, "item does not exist", 404, null);
                        reject(apiResponse);
                    }else {
                        console.log(result)
                        resolve(editedItem);
                    }
                })        
            
        })
    }

    validateInputParams()
    .then(editExistingItem)
    .then(updateExistingItem)
    .then((resolve)=>{
        let apiResponse = response.generate(false, "edit success", 200, resolve);
        res.send(apiResponse);
    })
    .catch((error)=>{
        res.send(error);
    })


    
}
// end of edit item function


// edit list function
// requires listId as body parameter
// optional editing properties like title, description should be passed as body parameters
let editList = (req, res)=>{
    if(req.body.listId){
        let updateOptions = {
            listTitle : req.body.listTitle,
            listDescription : req.body.listDescription
        }
        ListModel.update({listId : req.body.listId}, updateOptions, {multi : true}, (err, result)=>{
            if(err){
                logger.error("error editing list", "toDoController : editList", 9);
                let apiResponse = response.generate(true, "error editing list", 500, err);
                res.send(apiResponse);
            }else if(result.n == 0){
                logger.error("list not found", "toDoController : editList", 9);
                let apiResponse = response.generate(true, "list not found", 404, null);
                res.send(apiResponse);
            }else{
                logger.info("list edited successfully", "toDoController : editList", 9);
                let apiResponse = response.generate(false, "list edited successfully", 200, result);
                res.send(apiResponse);
            }
        })
    }else{
        logger.error("listId to be edited is not provided", "toDoController : editList", 9);
        let apiResponse = response.generate(true, "listId to be deleted is not provided", 400, null);
        res.send(apiResponse);
    }
}

// delete item function
//takes itemId as a path param
let deleteItem = (req, res)=>{
    if(req.params.itemId){
        
        ItemModel.remove({itemId : req.params.itemId}, (err, result)=>{
            if(err){
                logger.error("error deleting item", "toDoController : deleteItem", 9);
                let apiResponse = response.generate(true, "error deleting item", 500, err);
                res.send(apiResponse)
            }else if(result.n == 0){
                logger.error("item not found","toDoController : deleteItem", 9);
                let apiResponse = response.generate(true, "item not found", 404, null);
                res.send(apiResponse);
            }else{
                logger.info("item deleted successfully","toDoController : deleteItem", 9);
                let apiResponse = response.generate(false, "item deleted successfully", 200, result);
                res.send(apiResponse);
            }
        })
    }else{
        logger.error("itemID of the item to be deleted not provided", "toDoController : deleteItem",9);
        let apiResponse = response.generate(true, "itemID of the item to be deleted not provided", 400, null);
        res.send(apiResponse);
    }
}
// end of delete item function


// delete list function 
// it takes listId as a path param
let deleteList = (req, res)=>{

    // deleting the list items first before deleting the list
    let deleteListItems = ()=>{
        return new Promise((resolve, reject)=>{
            if(req.params.listId){
                ItemModel.remove({listId : req.params.listId},(err, result)=>{
                    if(err){
                        logger.error("error deleting the list items", "toDoController : deleteList - deleteListItems", 9);
                        let apiResponse = response.generate(true, "error deleting the list items", 500, err);
                        reject(apiResponse);
                    }else{
                        logger.info("list items deleted successfully", "toDoController : deleteList - deleteListItems", 9);
                        resolve();
                    }
                })
            }else{
                logger.error("listId for the list to be deleted not provided", "toDoController : deleteList- deletingList",9);
                let apiResponse = response.generate(true, "listId of the list to be deleted not provided", 400, null);
                reject(apiResponse);
            }

        })
    }
    
    let deletingList = ()=>{
        return new Promise((resolve, reject)=>{
            ListModel.remove({listId : req.params.listId},(err,result)=>{
                if(err){
                    logger.error("error deleting list", "toDoController : deleteList - deleteListItems", 9);
                    let apiResponse = response.generate(true, "error deleting list", 500, err);
                    reject(apiResponse);
                }else if(result.n == 0){
                    logger.error("list not found", "toDoController : deleteList - deletingList", 9);
                    let apiResponse = response.generate(true, "list not found", 404, null);
                    reject(apiResponse)
                }else{
                    logger.info("list deleted successfully", "toDoContoller : deleteList - deletingList", 9);
                    resolve(result);
                }
            })

        })
        
    }

    deleteListItems()
    .then(deletingList)
    .then((resolve)=>{
        let apiResponse = response.generate(false, "list deleted successfully", 200, resolve);
        res.send(apiResponse);
    })
    .catch((error)=>{
        res.send(error);
    })
    
}
// end of deleteList function

//get users all lists
// requires userId as a body parameter
// requires skip value as body paramter - optional
let getUserAllLists = (req, res)=>{
    if(req.body.userId){
        ListModel.find({listOwner : req.body.userId})
            .select('-__v -_id')
            .skip(parseInt(req.body.skip) || 0)
            .lean()
            .limit(10)
            .exec((err, result)=>{
                if(err){
                    logger.error("error retreiving lists of the user", "toDoController : getUserAllLists", 9);
                    let apiResponse = response.generate(true, "error retreiving lists of the user", 500, err);
                    res.send(apiResponse);
                }else if(check.isEmpty(result)){
                    logger.error("user's lists not found", "toDoController : getUserAllLists", 9);
                    let apiResponse = response.generate(true, "user's list not found", 404, null);
                    res.send(apiResponse);
                }else{
                    logger.info("user lists found", "toDoController - getUserAllLists", 9);
                    let apiResponse = response.generate(false, "user lists found", 200, result);
                    res.send(apiResponse);
                }
            })
    }else{
        logger.error("userId of the list owner not provided", "toDoController : getUserAllLists",9);
        let apiResponse = response.generate(true, "userId of the list owner not provided", 400, null);
        res.send(apiResponse);
    }
    
}
// end of get user's all lists function


// get all items of list 
// requires userId as a body parameter
// requires skip value as body paramter - optional
let getAllListItems = (req, res)=>{
    if(req.body.listId){
        ItemModel.find({listId : req.body.listId, isHidden : false})
            .select('-__v -_id')
            .skip(parseInt(req.body.skip) || 0)
            .lean()
            .limit(10)
            .exec((err, result)=>{
            if(err){
                logger.error("error retreiving items of the list", "toDoController : getAllListItems", 9);
                let apiResponse = response.generate(true, "error retreiving items of the list", 500, err);
                res.send(apiResponse);
            }else if(check.isEmpty(result)){
                logger.error("list's items not found", "toDoController : getAllListItems", 9);
                let apiResponse = response.generate(true, "list's items not found", 404, null);
                res.send(apiResponse);
            }else{
                logger.info("list items found", "toDoController - getAllListItems", 9);
                let apiResponse = response.generate(false, "list items found", 200, result);
                res.send(apiResponse);
            }
        })
    }else{
        logger.error("listId for the items required not provided", "toDoController : getAllListItems",9);
        let apiResponse = response.generate(true, "listId for teh items required not provided", 400, null);
        res.send(apiResponse);
    }
    
}

//mark item as done.
// it takes itemId as a path param
let markItemAsDone = (req, res)=>{
    if(req.params.itemId){
        let updatingValue = {status : "done"};
        ItemModel.update({itemId : req.params.itemId}, updatingValue, {multi : true}, (err, result)=>{
            if(err){
                logger.error("error upadting the status as done", "toDoController : markItemAsDone", 9);
                let apiResponse = response.generate(true, "error updating the status as done", 500, err);
                res.send(apiResponse);
            }else if(result.n == 0){
                logger.error("no item of given itemId available to mark as done", "toDoController : markItemAsDone", 9);
                let apiResponse = response.generate(true, "no item of given itemId found to mark as done", 404, null);
                res.send(apiResponse);
            }else{
                logger.info("item marked as done", "toDoController : markItemAsDone", 9);
                let apiResponse = response.generate(false, "item marked as done", 200, result);
                res.send(apiResponse);
            }
        })
    }
}
// end of markItemAsDone




//mark item as open.
// it takes itemId as a path param
let markItemAsOpen = (req, res)=>{
    if(req.params.itemId){
        let updatingValue = {status : "open"};
        ItemModel.update({itemId : req.params.itemId}, updatingValue, {multi : true}, (err, result)=>{
            if(err){
                logger.error("error upadting the status as open", "toDoController : markItemAsOpen", 9);
                let apiResponse = response.generate(true, "error updating the status as open", 500, err);
                res.send(apiResponse);
            }else if(result.n == 0){
                logger.error("no item of given itemId available to mark as open", "toDoController : markItemAsOpen", 9);
                let apiResponse = response.generate(true, "no item of given itemId found to mark as open", 404, null);
                res.send(apiResponse);
            }else{
                logger.info("item marked as open", "toDoController : markItemAsOpen", 9);
                let apiResponse = response.generate(false, "item marked as open", 200, result);
                res.send(apiResponse);
            }
        })
    }
}
// end of markItemAsOpen


//undo function 
let undoAction = (req, res)=>{

    // updating previous version of the item to hidden : false to make it visible
    // requires current version itemId as path parameter
    let updatePreviousVersion = ()=>{
        return new Promise((resolve, reject)=>{
            if(req.params.itemId){
                ItemModel.update({nextId : req.params.itemId}, {isHidden : false}, {multi : true}, (err, result)=>{
                    if(err){
                        logger.error("error updating previous version","toDoController : undoAction - updatePreviousVersion", 9);
                        let apiResponse = response.generate(true, "error updating previous version", 500, err);
                        reject(apiResponse);
                    }else if(result.n == 0){
                        logger.error("no previous version found", "toDoController : undoAction - updatePreviousVersion", 9);
                        let apiResponse = response.generate(true, "previous version not found", 404, null);
                        reject(apiResponse);
                    }else{
                        resolve()
                    }                    
                })
            }else {
                logger.error("itemId of the item not provided", "toDoController : undoAction - updatePreviousVersion", 9);
                let apiResponse = response.generate(true, "itemId of the item not provided", 400, null);
                reject(apiResponse);
            }
        })
    }

    // updating current version to hidden : true
    let updateCurrentVersion = ()=>{
        return new Promise((resolve, reject)=>{
            ItemModel.update({itemId : req.params.itemId}, {isHidden : true}, {multi : true}, (err, result)=>{
                if(err){
                    logger.error("error updating current version", "toDoController : undoAction - updateCurrentVersion", 9);
                    let apiResponse = response.generate(true, "error updating current version", 500, err);
                    reject(apiResponse);
                }else if(result.n == 0){
                    logger.error("current item not found", "toDoController : undoAction - updateCurrentVersion", 9);
                    let apiResponse = response.generate(true, "current item not found", 404, null);
                    reject(apiResponse);
                }else{
                    resolve();
                }
            })
        })
    }


    updatePreviousVersion()
    .then(updateCurrentVersion)
    .then((resolve)=>{
        let apiResponse = response.generate(false, "undo successfull", 200, resolve);
        res.send(apiResponse);
    })
    .catch((error)=>{
        res.send(error);
    })

}
// complete undo function




//redo function 
let redoAction = (req, res)=>{

    // updating previous version of the item to hidden : false to make it visible
    // requires current version itemId as path parameter
    let updateNextVersion = ()=>{
        return new Promise((resolve, reject)=>{
            if(req.params.itemId){
                ItemModel.update({previousId : req.params.itemId}, {isHidden : false}, {multi : true}, (err, result)=>{
                    if(err){
                        logger.error("error updating next version","toDoController : redoAction - updateNextVersion", 9);
                        let apiResponse = response.generate(true, "error updating next version", 500, err);
                        reject(apiResponse);
                    }else if(result.n == 0){
                        logger.error("no next version found", "toDoController : redoAction - updateNextVersion", 9);
                        let apiResponse = response.generate(true, "next version not found", 404, null);
                        reject(apiResponse);
                    }else{
                        resolve()
                    }                    
                })
            }else {
                logger.error("itemId of the item not provided", "toDoController : redoAction - updatePreviousVersion", 9);
                let apiResponse = response.generate(true, "itemId of the item not provided", 400, null);
                reject(apiResponse);
            }
        })
    }

    // updating current version to hidden : true
    let updateCurrentVersion = ()=>{
        return new Promise((resolve, reject)=>{
            ItemModel.update({itemId : req.params.itemId}, {isHidden : true}, {multi : true}, (err, result)=>{
                if(err){
                    logger.error("error updating current version", "toDoController : redoAction - updateCurrentVersion", 9);
                    let apiResponse = response.generate(true, "error updating current version", 500, err);
                    reject(apiResponse);
                }else if(result.n == 0){
                    logger.error("current item not found", "toDoController : redoAction - updateCurrentVersion", 9);
                    let apiResponse = response.generate(true, "current item not found", 404, null);
                    reject(apiResponse);
                }else{
                    resolve();
                }
            })
        })
    }


    updateNextVersion()
    .then(updateCurrentVersion)
    .then((resolve)=>{
        let apiResponse = response.generate(false, "redo successfull", 200, resolve);
        res.send(apiResponse);
    })
    .catch((error)=>{
        res.send(error);
    })

}
// complete redo function




// ______________________________________________________________________________________________
// ----------------------test functions ---------------------------------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let deleteTestList = (req, res)=>{
    ListModel.remove({listOwner : "urDcyozH"},(err, result)=>{
        // ToDoModel.find((err, result)=>{ 
        if(err){
            logger.error("error deleting the list","toDoController : deleteList", 9);
            let apiResponse = response.generate(true, "error deleting the list", 500, err);
            res.send(apiResponse)
        }else{
            logger.info("deleting the list","toDoController : deleteList", 9);
            let apiResponse = response.generate(false, "deleting the list", 500, result);
            res.send(apiResponse)
        }
    })
}

let getAllTestLists = (req, res)=>{
    
        ListModel.find((err, result)=>{ 
        if(err){
            logger.error("error deleting the list","toDoController : deleteList", 9);
            let apiResponse = response.generate(true, "error deleting the list", 500, err);
            res.send(apiResponse)
        }else{
            logger.info("deleting the list","toDoController : deleteList", 9);
            let apiResponse = response.generate(false, "deleting the list", 500, result);
            res.send(apiResponse)
        }
    })
}

let deleteTestItem = (req, res)=>{
    ItemModel.remove({owner : "urDcyozH"},(err, result)=>{
        // ToDoModel.find((err, result)=>{ 
        if(err){
            logger.error("error deleting the list","toDoController : deleteList", 9);
            let apiResponse = response.generate(true, "error deleting the list", 500, err);
            res.send(apiResponse)
        }else{
            logger.info("deleting the list","toDoController : deleteList", 9);
            let apiResponse = response.generate(false, "deleting the list", 500, result);
            res.send(apiResponse)
        }
    })
}

let getAllTestItems = (req, res)=>{
    
        ItemModel.find((err, result)=>{ 
        if(err){
            logger.error("error deleting the list","toDoController : deleteList", 9);
            let apiResponse = response.generate(true, "error deleting the list", 500, err);
            res.send(apiResponse)
        }else{
            logger.info("deleting the list","toDoController : deleteList", 9);
            let apiResponse = response.generate(false, "deleting the list", 500, result);
            res.send(apiResponse)
        }
    })
}


module.exports = {
    createNewList : createNewList,
    createNewItem : createNewItem,
    editItem : editItem,
    editList : editList,
    deleteItem : deleteItem,
    deleteList : deleteList,
    getUserAllLists : getUserAllLists,
    getAllListItems : getAllListItems,
    markItemAsDone : markItemAsDone,
    markItemAsOpen : markItemAsOpen,
    undoAction : undoAction,
    redoAction : redoAction,

    deleteTestList : deleteTestList,    // test
    getAllTestLists : getAllTestLists,  // test
    deleteTestItem : deleteTestItem,    // test
    getAllTestItems : getAllTestItems,  // test
}