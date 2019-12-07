const logger = require('./../libs/loggerLib');
const response = require('../libs/responseLib');
const check = require('./../libs/checkLib');

const mongoose = require('mongoose');

const FriendModel = mongoose.model('Friend');


// to check the user is authorized to do CRUD operations on the item of the list
let isAuthorized = (req, res, next) => {

    if (req.body.listOwnerId && req.user.userId) {
        if (req.body.listOwnerId == req.user.userId) {
            next();
        } else {
            let queryObj = {
                userId: req.body.listOwnerId,
                friendId: req.user.userId,
                isFriend: true
            }
            FriendModel.findOne(queryObj, (err, result) => {
                if (err) {
                    logger.error("error verifying friend status of the requested user with the owner of the list", "middleware - friendCheck : isauthorized", 9);
                    let apiResponse = response.generate(true, "error while verifying friend statu of the requested user with the owner of the list", 500, err);
                    res.send(apiResponse);
                } else if (check.isEmpty(result) || req.body.actionOnList) {
                    logger.error("user is not authorized", "middleware - friendCheck : isAuthorized", 9);
                    let apiResponse = response.generate(true, "user is not authorized", 400, null);
                    res.send(apiResponse);
                } else {
                    next();
                }
            })
        }
    } else {
        logger.error("unable to verify authorization, as details are not provided to verify friend status", "middleware-friendCheck: isAuthorized", 9)
        let apiResponse = response.generate(true, "unable to verify authorization, as details are not provided to verify friend status", 500, null);
        res.send(apiResponse);
    }



}

module.exports = {
    isAuthorized: isAuthorized
}