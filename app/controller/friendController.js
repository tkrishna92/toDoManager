const mongoose = require('mongoose');
const shortid = require('shortid');

const check = require('../libs/checkLib');
const logger = require('../libs/loggerLib');
const response = require('../libs/responseLib');


const UserModel = mongoose.model('User');
const FriendModel = mongoose.model('Friend');



// requires userId of the request receiver to be passed as body parameter
let sendFriendRequest = (req, res)=>{

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
                    resolve(result);
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

module.exports = {
    sendFriendRequest : sendFriendRequest
}