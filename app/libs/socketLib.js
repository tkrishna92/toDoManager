const mongoose = require('mongoose');
const events = require('events');
const socketio = require('socket.io');
const eventEmitter = new events.EventEmitter();

const logger = require('./loggerLib');
const check = require('./checkLib');
const token = require('./tokenLib');
const response = require('./responseLib');

const shortid = require('shortid');

const FriendModel = mongoose.model('Friend');
const UserModel = mongoose.model('User');
const ListModel = mongoose.model('List');
const ItemModel = mongoose.model('Item')

let setServer = (server)=>{

    let onlineUsers = [];

    let io = socketio.listen(server);

    let myIo = io.of('');

    myIo.on('connection', (socket)=>{
        console.log('connection established successfully - trying to emit verifyUser')

        // on connection asking the user to verify authToken
        socket.emit('verifyUser', '');

        // on receiving 'auth-user' request from user with authToken, the user will be verified
        socket.on('auth-user', (authToken)=>{
            console.log(authToken);
            token.verifyWithoutSecretKey(authToken, (err, user)=>{
                if(err){
                    socket.emit("error-occurred", {status : 500, error : 'invalid token provided'});
                }else {

                    let currentUser = user.data;
                    console.log(currentUser);
                    socket.userId = currentUser.userId;

                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`;

                    let userObj = {userId : currentUser.userId, fullName : fullName};

                    onlineUsers.push(userObj);

                    

                    socket.room = 'toDoUsers';
                    socket.join(socket.room);
                    // updating the online list to everyone 
                    socket.join(socket.room).broadcast.emit('online-user-list', onlineUsers);

                    eventEmitter.emit('get-user-friends',(currentUser.userId));

                    eventEmitter.emit('join-friends-rooms',(currentUser.userId))

                }
            })
        })


        // on login after verification of authToken, client emits 'get-user-lists' 
        // socket.io on receiving event emits 'get-list' on eventEmitter
        socket.on('get-user-lists', (request)=>{
            eventEmitter.emit('get-list',(request));
        })

        // emit user lists
        eventEmitter.on('send-list', (data)=>{

            myIo.emit(data.userId, data);
        })

        // emit friends of the user on login
        eventEmitter.on('user-friends', (data)=>{
            console.log("user friends event heard");
            console.log(data);
            myIo.emit(data.userId, data)
        })

        // join friends rooms

        eventEmitter.on('join-friends-rooms', (userId)=>{
            let queryObj = {
                userId : userId,
                isFriend : true
            }
            FriendModel.find(queryObj, (err, result)=>{
                if(err){
                    logger.error("error retreiving user's friends", "socketLib : eventEmitter on 'join-friends-rooms", 9);
                    socket.emit("error-occurred", {status : 500, error : "unable to subscribe to friends notifications"});
                }else if(check.isEmpty(result)){
                    logger.info("user has no active friends", "socketLib : eventEmitter on 'join-friends-rooms' ");
                }else {
                    console.log(result);
                    result.map((user)=>{
                        
                        socket.join(user.friendRoom);
                        console.log("current user joined :");
                        console.log(user.friendRoom);
                        socket.to(user.friendRoom).broadcast.emit("friend-test", "hi");
                    })

                    

                }
            })
        })

        // on sending/accepting a friend request an event "friend-request" will be emitted
        socket.on('friend-request',(data)=>{
            console.log("request data : ")
            console.log(data);
            let friendName = data.friendName;
            let notificationMessage = data.notificationMessage;
            UserModel.findOne({userId : data.userId},(err, result)=>{
                if(err){
                    logger.error("error retreiving request receiver user detials", "socketLib : on 'friend-request'", 9);
                    let socketResponse = response.generate(true, "error retreiving request receiver user details for notification purpose", 500, err);
                    socket.emit(data.senderId, socketResponse);
                }else if(check.isEmpty(result)){
                    logger.error("request receiver user detials not found for notification of friend request", "socketLib : on 'friend-request'", 9);
                    let socketResponse = response.generate(true, "request receiver user detials not found for notification of friend request", 404, null);
                    socket.emit(data.senderId, socketResponse);
                }else {
                    logger.info("friend request notification success","socketLib : on 'friend-request'", 9);
                    let data = {
                        senderName : friendName,
                        receiverName : `${result.firstName} ${result.lastName}`,
                        message : notificationMessage
                    }
                    socket.to(socket.room).broadcast.emit("friend-request-notification", data);
                }
            })
        })
        

        // on successfull list action an event "list-action" will be send from client
        socket.on('list-action',(data)=>{
            console.log("request data : ")
            console.log(data);
            let roomId = data.roomId;
            
            let notificationDetail = `${data.userName} ${data.notificationMessage}`

            socket.to(data.roomId).broadcast.emit('action-notification', notificationDetail);
        })
        
        // socket on disconnection
        socket.on('disconnect', ()=>{
            let userConnected = onlineUsers.map((user)=>{return user.userId})
            console.log(userConnected);

            let removeIndex = userConnected.indexOf(socket.userId);

            console.log(typeof(removeIndex));
            console.log(removeIndex);
            onlineUsers.splice(removeIndex,1);
            console.log(onlineUsers);

            socket.to(socket.room).broadcast.emit('online-user-list', onlineUsers);
            socket.leave(socket.room);
        })

    })
}




//----------------------------------------------------------
//----------- eventEmitter listening events-----------------
//----------------------------------------------------------

// this gets and emits user lists
eventEmitter.on('get-list', (request)=>{
    let queryObj = {
        listOwner : request.listOwner,
        listIsHidden : false
    }
    ListModel.find(queryObj)
            .select('-__v -_id')
            .lean()
            .limit(10)
            .exec((err, result) => {
                
                if (err) {
                    logger.error("error retreiving lists of the user", "socketLib : eventEmitter on 'get-list' ", 9);
                    apiResponse = response.generate(true, "error retreiving lists of the user", 500, err);
                    let data ={userId : request.userId, userList : apiResponse}                    
                    eventEmitter.emit('send-list', data);
                } else if (check.isEmpty(result)) {
                    logger.error("user's lists not found", "socketLib : eventEmitter on 'get-list' ", 9);
                    apiResponse = response.generate(true, "user's list not found", 404, null);
                    let data ={userId : request.userId, userList : apiResponse} 
                    eventEmitter.emit('send-list', data);
                } else {
                    logger.info("user lists found", "socketLib : eventEmitter on 'get-list' ", 9);
                    apiResponse = response.generate(false, "user lists found", 200, result);
                    let data ={userId : request.userId, userList : apiResponse}
                    eventEmitter.emit('send-list', data);
                }
    })
    
})



// get user friends

eventEmitter.on('get-user-friends',(userId)=>{
    console.log("get user friends event called")

    let queryObj = {
        userId : userId,
        isFriend : true
    }
    FriendModel.find(queryObj)
        .select('-__v -_id')
        .exec((err, result)=>{
            if(err){
                logger.error("error retrieving users friends", "socketLib : eventEmitter on get-user-friends", 9);
                socketResponse = response.generate(true, "error retreiving user's friends", 500, err);
                let data = {userId : userId, userFriends : socketResponse};
                eventEmitter.emit('user-friends', data);
            }else if(check.isEmpty(result)){
                logger.error("no friends of the user found", "socketLib : eventEmitter on get-user-friends", 9);
                socketResponse = response.generate(true, "no friends found", 404, null);
                let data = {userId : userId, userFriends : socketResponse};
                eventEmitter.emit('user-friends', data);
            }else {
                logger.info("friends found", "socketLib : eventEmitter on get-user-friends", 9);
                socketResponse = response.generate(false, "friends found", 200, result);
                let data = {userId : userId, userFriends : socketResponse};
                eventEmitter.emit('user-friends', data);
            }
    })
})







// ----------- eventEmitter emitting events---------------------






module.exports = {
    setServer : setServer
}