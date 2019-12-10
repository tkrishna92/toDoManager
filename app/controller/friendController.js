const mongoose = require('mongoose');
const shortid = require('shortid');

const check = require('../libs/checkLib');
const logger = require('../libs/loggerLib');
const response = require('../libs/responseLib');

const UserModel = mongoose.model('User');
const FriendModel = mongoose.model('Friend');


// used for sending a friend request to a user
// requires userId of the request receiver to be passed as body parameter
let sendFriendRequest = (req, res)=>{

    console.log("sendFriendRequest 1")
    let validateInputParams = ()=>{
        return new Promise((resolve, reject)=>{
            if(req.user.userId){
                UserModel.findOne({userId : req.user.userId}, (err, result)=>{
                    if(err){
                        logger.error("error retreiving sender details", "friendController : sendFriendRequest - validateInputParams", 9);
                        let apiResponse = response.generate(true, "error retreiving senders details", 500, err);
                        reject(apiResponse);
                    }else if(check.isEmpty(result)){
                        logger.error("sender details not found", "friendController : sendFriendRequest - validateInputParams", 9);
                        let apiResponse = response.generate(true, "senders details not found", 404, null);
                        reject(apiResponse);
                    }else{
                        let senderDetails = result.toObject();
                        delete senderDetails.__v;
                        delete senderDetails._id;
                        delete senderDetails.createdOn;
                        delete senderDetails.password;
                        resolve(senderDetails);
                    }
                })
            }else{
                logger.error("userId of the sender not provide", "friendController : sendFriendRequest - validateInputParams", 9);
                let apiResponse = response.generate(true, "userId of the sender not provided", 400, null);
                reject(apiResponse);
            }
        })
    }


    let sendSenderDetails = (senderDetails)=>{
        return new Promise((resolve, reject)=>{
            console.log("sendFriendRequest 2")
            let queryObj = {
                $or :[
                    {
                        $and : [
                            {userId : req.body.userId},
                            {friendId : req.user.userId},
                            {isFriend : false}
                        ]
                    
                    },
                    {
                        $and : [
                            {userId : req.body.userId},
                            {friendId : req.user.userId},
                            {isFriend : true}
                        ]
                    
                    },
                    {
                        $and : [
                            {userId : req.user.userId},
                            {friendId : req.body.userId},
                            {isFriend : false}
                        ]
                    
                    },
                    {
                        $and : [
                            {userId : req.user.userId},
                            {friendId : req.body.userId},
                            {isFriend : true}
                        ]
                    
                    }
                ]
                
            }
            FriendModel.findOne(queryObj, (err, result)=>{
                console.log("sendFriendRequest 3")
                if(err){
                    logger.error("error checking if the friend request exists", "friendController : sendFriendRequest - sendSenderDetails",9);
                    let apiResponse = response.generate(true, "error while checking if a pending friend request already exits", 500, err);
                    reject(apiResponse);
                }else if(check.isEmpty(result)){
                    let newFriendRequest = new FriendModel({
                        userId : req.body.userId,
                        friendId : senderDetails.userId,
                        friendName : `${senderDetails.firstName} ${senderDetails.lastName}`,
                        friendRoom : senderDetails.roomId
                    })
                    newFriendRequest.save((err, result)=>{
                        if(err){
                            logger.error("error saving new friend request", "friendController : sendFriendRequest - sendSenderDetails", 9);
                            let apiResponse = response.generate(true, "error saving new friend request", 500, err);
                            reject(apiResponse);
                        }else{
                            let request = result.toObject();
                            delete request.__v;
                            delete request._id;
                            resolve(request);
                        }
                    })

                }else{
                    logger.error("friend request already sent and is either accepted or pending acceptance", "friendController : sendFriendRequest - sendSenderDetails", 9);
                    let apiResponse = response.generate(true, "friend request already sent and is either accepted or pending acceptance", 400, null);
                    reject(apiResponse);
                }

            })



            
        })
    }

    validateInputParams()
    .then(sendSenderDetails)
    .then((resolve)=>{
        let apiResponse = response.generate(false, "request sent successfully", 200, resolve);
        res.send(apiResponse);
    })
    .catch((error)=>{
        res.send(error);
    })

}



// check if the user has any friend request pending
let checkRequest = (req, res)=>{
    let queryObj = {
        $and : [
            {userId : req.user.userId},
            {isFriend : false}
        ]
    }
        FriendModel.find(queryObj)
        .select('-__v -_id')
        .lean()
        .exec((err, result)=>{
            if(err){
                logger.error("error retreiving pending request", "friendController : checkRequest", 9);
                let apiResponse = response.generate(true, "error retreiving pending requests", 500, err);
                res.send(apiResponse);
            }else if(check.isEmpty(result)){
                logger.error("no pending requests", "friendController : checkRequest", 9);
                let apiResponse = response.generate(true, "no pending requests found", 404, null);
                res.send(apiResponse);
            }else {
                logger.info("pending requests found", "friendController : checkRequests", 9);
                let apiResponse = response.generate(false, "pending requests found", 200, result);
                res.send(apiResponse);
            }
        })
}
// completed checking pending requests functionality



// accepting friend request function
// updates the friendRequest "isFriend":"true"
// saves a new friend element with the acceptors details
// requires request sender's userId as body parameter
let acceptFriend = (req, res)=>{

    // updating the "isFriend" in the user's friendRequest item
    let updateFriendRequest = ()=>{
        return new Promise((resolve, reject)=>{
            if(req.body.friendId){
                let queryObj = {
                    $and : [
                        {userId : req.user.userId},
                        {friendId : req.body.friendId},
                        {isFriend : false}
                    ]
                }
                FriendModel.update(queryObj, {isFriend : true}, {multi : true}, (err, result)=>{
                    if(err){
                        logger.error("error updating friend request as accepted", "friendController : acceptFriend - updateFriendRequest", 9);
                        let apiResponse = response.generate(true, "error updating friend request as accepted", 500, err);
                        reject(apiResponse);
                    }else if(result.n == 0){
                        logger.error("no such pending friend request found", "friendController : acceptFriend - updateFriendRequest", 9);
                        let apiResponse = response.generate(true, "no such pending request found", 404, null);
                        reject(apiResponse);
                    }else {
                        resolve(result);
                    }
                })

            }else{
                logger.error("no friend id provided", "friendController : acceptFriend - updateFriendRequest", 9);
                let apiResponse = response.generate(true, "request sender's user Id missing", 400, null);
                reject(apiResponse);
            }
        })
    }

    //getting accepting user details to create a new friend item for the request sender, so that the request sender also has the request acceptors roomId details
    let getAcceptorDetails = ()=>{
        return new Promise((resolve, reject)=>{
            UserModel.findOne({userId : req.user.userId}, (err, result)=>{
                if(err){
                    logger.error("error retreiving acceptor's user details", "friendController : acceptFriend - getAcceptorDetails", 9);
                    let apiResponse = response.generate(true, "error retreiving acceptor's user details", 500, err);
                    reject(apiResponse);
                }else if(check.isEmpty(result)){
                    logger.error("acceptor details not found", "friendController : acceptFriend - getAcceptorDetails", 9);
                    let apiResponse = response.generate(true, "accpetor details not found", 404, null);
                    reject(apiResponse);
                }else{
                    let acceptorDetails = result.toObject();
                    console.log(acceptorDetails);
                    resolve(acceptorDetails);
                }
            })
        })
    }


    // creating a new friend item for the sender in the db
    let newAcceptedFriend = (acceptorDetails)=>{
        return new Promise((resolve, reject)=>{
            let acceptedFriend = new FriendModel({
                userId : req.body.friendId,
                friendId : acceptorDetails.userId,
                friendName : `${acceptorDetails.firstName} ${acceptorDetails.lastName}`,
                isFriend : true,
                friendRoom : acceptorDetails.roomId
            })
            acceptedFriend.save((err, result)=>{
                if(err){
                    logger.error("error creating a new accepted friend item", "friendController : acceptFriend - newAcceptedFriend", 9);
                    let apiResponse = response.generate(true, "error creating a new accepted friend item", 500, err);
                    reject(apiResponse);
                }else{
                    logger.info("friend request accepted successfully", "friendController : acceptFriend - newAcceptedFriend", 9);
                    let accepteFriendItem = result.toObject();
                    delete accepteFriendItem.__v;
                    delete accepteFriendItem._id;
                    resolve(accepteFriendItem);
                }
            })
        })
    }

    updateFriendRequest()
    .then(getAcceptorDetails)
    .then(newAcceptedFriend)
    .then((resolve)=>{
        let apiResponse = response.generate(false, "friend request accepted successfully", 200, resolve);
        res.send(apiResponse);
    })
    .catch((error)=>{
        res.send(error);
    })

}





// friendCheck function 
// it allows the front end to disable/ enable some actions for list/items
let friendCheck = (req, res)=>{
    if(req.body.selectedUserId){
        let queryObj = {
            userId : req.body.selectedUserId,
            friendId : req.user.userId,
            isFriend : true
        }
        FriendModel.findOne(queryObj)
        .select('-__v -_id')
        .lean()
        .exec((err, result)=>{
            if(err){
                logger.error("error verifying user's friend", "friendController : friendCheck", 9);
                let apiResponse = response.generate(true, "error verifying user's friend", 500, err);
                res.send(apiResponse);
            }else if(check.isEmpty(result)){
                logger.error("selected user not a friend yet", "friendController : friendCheck", 9);
                let apiResponse = response.generate(true, "selected user not a friend", 400, null)
                res.send(apiResponse);
            }else{
                logger.info("selected user is a friend of the current user", "friendController : friendCheck")
                let apiResponse = response.generate(false, "selected user is a friend of the current user", 200, result);
                res.send(apiResponse);
            }
        })
    }
}








//---------------------------------------------------------------------------------------------------------------------
//-------------------------- test functions---------------------------------------------------------------------------
//______________________________________________________________________________________________________________________




let getAllRequests = (req, res)=>{
    FriendModel.find()
    .exec((err, result)=>{
        if(err){
            let apiResponse = response.generate(true, "error getting request",500, err);
            res.send(apiResponse);
        }else {
            let apiResponse = response.generate(false, "getting request",500, result);
            res.send(apiResponse);
        }
    })
}

let getUserRequests = (req, res)=>{
    FriendModel.find({userId : req.body.userId})
    .exec((err, result)=>{
        if(err){
            let apiResponse = response.generate(true, "error getting request",500, err);
            res.send(apiResponse);
        }else {
            let apiResponse = response.generate(false, "getting request",500, result);
            res.send(apiResponse);
        }
    })
}

let deleteAllRequests = (req, res)=>{
    FriendModel.remove({userId : req.body.userId})
    .exec((err, result)=>{
        if(err){
            let apiResponse = response.generate(true, "error deleting request",500, err);
            res.send(apiResponse);
        }else {
            let apiResponse = response.generate(false, "deleting request",500, result);
            res.send(apiResponse);
        }
    })
}

let deleteRequest = (req, res)=>{
    FriendModel.remove({userId : req.body.userId},
        {friendId : req.body.friendId})
    .exec((err, result)=>{
        if(err){
            let apiResponse = response.generate(true, "error deleting request",500, err);
            res.send(apiResponse);
        }else {
            let apiResponse = response.generate(false, "deleting request",500, result);
            res.send(apiResponse);
        }
    })
}

module.exports = {
    sendFriendRequest : sendFriendRequest,
    checkRequest : checkRequest,
    acceptFriend : acceptFriend,
    friendCheck : friendCheck,
    
    getAllTestRequests: getAllRequests,
    getUserTestRequests : getUserRequests,
    deleteAllTestRequests : deleteAllRequests,
    deleteTestRequest : deleteRequest
}