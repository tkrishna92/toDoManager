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

                    let request = {
                        listOwner : currentUser.userId,
                        userId : currentUser.userId
                    }

                    // eventEmitter.emit('join-friends-rooms',(currentUser.userId))

                    socket.room = 'toDoUsers';
                    socket.join(socket.room);
                    // updating the online list to everyone 
                    console.log("emitting updated online users on 'online-user-list'")
                    console.log(onlineUsers)
                    socket.to(socket.room).broadcast.emit('online-user-list', onlineUsers);                  

                    // eventEmitter.emit('online-list', onlineUsers);
                    

                }
            })
        })

        // eventEmitter.on('online-list', (onlineUsers)=>{
        //     myIo.emit('online-user-list', onlineUsers);
        // })

        socket.on('get-online-users',(request)=>{
            console.log("emiting online users on 'get-online-users'")
            console.log(onlineUsers);
            let data = {
                onlineUsersList : onlineUsers
            }
            socket.emit(request.userId, data);
        })

        

        // client emits 'get-user-lists' on selecting a user who is a friend
        // socket.io on receiving event emits 'get-list' on eventEmitter
        socket.on('get-user-lists', (request)=>{
            console.log("get-user-lists event heard")
            eventEmitter.emit('get-list',(request));
        })

        // client emits 'get-list-items' on selecting a list
        // socket.io on receiving event emits 'get-item' on eventEmitter
        socket.on('get-list-items', (request)=>{
            console.log(request);
            console.log("get-list-items event heard")
            eventEmitter.emit('get-items',(request));
        })

        // client on receiving 'online-user-list' emits 'get-friends' with their userId as data

        socket.on('get-friends', (data)=>{
            console.log("get-friends event heard")
            eventEmitter.emit('get-user-friends',(data.userId));
        })

        socket.on('get-todo-users', (data)=>{
            console.log("get todo users event called");
            eventEmitter.emit('get-all-todo-users', (data));
        })

        // client on logging in successfully emits "friend-request-count" to which the socket sends
        // back the number of pending request

        socket.on('friend-request-count',(request)=>{
            console.log("get friend request count event heard from : "+request);
            eventEmitter.emit('request-count', (request))
        })


        // -----------------------------------eventEmitters events---------------------
        // emit user lists
        eventEmitter.on('send-list', (data)=>{
            console.log('send-list event heard from eventEmitter')
            console.log(data);
            if(data.requestDetails.userId == data.requestDetails.listOwner){
                myIo.emit(data.requestDetails.userId, data); 
                myIo.emit(data.requestDetails.listOwner, data);
            }else{
                myIo.emit(data.requestDetails.userId, data);
                myIo.emit(data.requestDetails.listOwner, data);
            }
            // myIo.emit(data.requestDetails.userId, data);
        })

        // emit list items
        eventEmitter.on('send-items', (data)=>{
            console.log('send-items event heard from eventEmitter')
            console.log(data);
            console.log(data.requestDetails.userId);
            myIo.emit(data.requestDetails.userId, data);
        })




        // emit friends of the user on login
        eventEmitter.on('user-friends', (data)=>{
            // console.log("user friends event heard from eventEmitter");
            // console.log(data);
            myIo.emit(data.userId, data)
        })

        // send pending request count to the user
        eventEmitter.on('pending-count', (data)=>{
            console.log("sending pending request count")
            console.log(data);
            myIo.emit(data.userId, data);
        })


        // send todo App users details
        eventEmitter.on('send-todo-users', (data)=>{
            myIo.emit(data.userId, data);
        })


        // join friends rooms
        socket.on('join-friends-rooms', (userId)=>{
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
            UserModel.findOne({userId : data.data.userId},(err, result)=>{
                if(err){
                    logger.error("error retreiving request receiver user detials", "socketLib : on 'friend-request'", 9);
                    let socketResponse = response.generate(true, "error retreiving request receiver user details for notification purpose", 500, err);
                    console.log("emitted friend notification to room toDoUsers 1")
                    socket.emit("error-occurred", socketResponse);
                }else if(check.isEmpty(result)){
                    logger.error("request receiver user detials not found for notification of friend request", "socketLib : on 'friend-request'", 9);
                    let socketResponse = response.generate(true, "request receiver user detials not found for notification of friend request", 404, null);
                    console.log("emitted friend notification to room toDoUsers 2")
                    socket.emit("error-occurred", socketResponse);
                }else {
                    logger.info("friend request notification success","socketLib : on 'friend-request'", 9);
                    let data = {
                        senderName : friendName,
                        receiverName : `${result.firstName} ${result.lastName}`,
                        message : notificationMessage
                    }
                    socket.to(socket.room).broadcast.emit('friend-request-notification', data);
                    console.log("emitted friend notification to room toDoUsers 3")
                    eventEmitter.emit('request-count', (data.userId));
                    eventEmitter.emit('request-count', (data.friendId));
                }
            })
        })
        

        // on successfull list action an event "list-action" will be send from client
        socket.on('list-action',(data)=>{
            console.log("list action request data : ")
            console.log(data);
            let roomId = data.roomId;
            
            notificationDetail = {
                details : data,
                message : `${data.userName} ${data.notificationMessage}`
            }

            socket.to(roomId).broadcast.emit('action-notification', notificationDetail);
        })


        // on successfull item action an event "item-action" will be send from client
        socket.on('item-action',(data)=>{
            console.log("item action request data : ")
            console.log(data);
            let roomId = data.roomId;
            
            notificationDetail = {
                details : data,
                message : `${data.userName} ${data.notificationMessage}`
            }

            socket.to(roomId).broadcast.emit('item-action-notification', notificationDetail);
        })
        
        //socket on error
        eventEmitter.on('error-occurred', (data)=>{
            socket.emit('error-occurred', data)
        })


        // socket on disconnection
        socket.on('disconnect', ()=>{
            
            let queryObj = {
                userId : socket.userId,
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
                        socket.leave(user.friendRoom);
                        console.log("current user left :");
                        console.log(user.friendRoom);
                    })
                }
            })

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


//this gets emits list items on being called
eventEmitter.on('get-items',(request)=>{
    console.log(request);
    console.log(request.listId);
    console.log("event 'get-items' heard");
    let queryObj = {
        listId : request.listId,
        isHidden : false,
    }
    console.log(queryObj);
    ItemModel.find(queryObj, (err, result)=>{
        if(err){
            logger.error("error retreiving items of the list", "socketLib : eventEmitter on 'get-items'", 9);
            let socketResponse = response.generate(true, "error retreiving items of the list", 500, err);
            let data = {userId : request, response : socketResponse}
            eventEmitter.emit('error-occurred', data);
        }else if(check.isEmpty(result)){
            logger.error("no items found on the list", "socketLib : eventEmitter on 'get-items'", 9);
            let socketResponse = response.generate(true, "no items found on the list", 404, null);
            let data = {userId : request, response : socketResponse}
            eventEmitter.emit('error-occurred', data);
        }else {
            logger.info("items found on the list", "socketLib : eventEmitter on 'get-items'", 9);
            let socketResponse = response.generate(false, "items of the list found", 200, result);
            let data = {requestDetails: request, response : socketResponse}
            eventEmitter.emit('send-items', data);
        }
    })
})



// this gets and emits user lists
eventEmitter.on('get-list', (request)=>{
    console.log("event 'get-list' heard" )
    console.log(request.listOwner)
    console.log(request);
    let queryObj = {
        listOwner : request.listOwner,
        listIsHidden : false,
        listStatus : request.listStatus
    }
    ListModel.find(queryObj)
            .select('-__v -_id')
            .lean()
            .limit(10)
            .exec((err, result) => {
                
                if (err) {
                    logger.error("error retreiving list of the user", "socketLib : eventEmitter on 'get-list' ", 9);
                    socketResponse = response.generate(true, "error retreiving lists of the user", 500, err);
                    let data ={userId : request.userId, userList : socketResponse, request : request} 
                    eventEmitter.emit('error-occurred', data);
                } else if (check.isEmpty(result)) {
                    logger.error("user's lists not found", "socketLib : eventEmitter on 'get-list' ", 9);
                    socketResponse = response.generate(true, `user's list not found`, 404, null);
                    let data ={userId : request.userId, userList : socketResponse, request : request} 
                    eventEmitter.emit('error-occurred', data);
                } else {
                    logger.info("user lists found", "socketLib : eventEmitter on 'get-list' ", 9);
                    socketResponse = response.generate(false, "user lists found", 200, result);
                    let data ={requestDetails : request, userList : socketResponse}
                    eventEmitter.emit('send-list', data);
                }
    })
    
})



// get user friends

eventEmitter.on('get-user-friends',(userId)=>{
    console.log("get user friends event heard")

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
                let data = {userId : userId, userFriends : socketResponse, request : userId};
                eventEmitter.emit('error-occurred', data);
            }else if(check.isEmpty(result)){
                logger.error("no friends of the user found", "socketLib : eventEmitter on get-user-friends", 9);
                socketResponse = response.generate(true, "no friends found", 404, null);
                let data = {userId : userId, userFriends : socketResponse, request : userId};
                eventEmitter.emit('error-occurred', data);
            }else {
                logger.info("friends found", "socketLib : eventEmitter on get-user-friends", 9);
                socketResponse = response.generate(false, "friends found", 200, result);
                let data = {userId : userId, userFriends : socketResponse, request : userId};
                eventEmitter.emit('user-friends', data);
            }
    })
})


eventEmitter.on('request-count', (request)=>{
    let queryObj = {
        $and : [
            {userId : request},
            {isFriend : false}
        ]
    }
        FriendModel.count(queryObj)
        .select('-__v -_id')
        .lean()
        .exec((err, result)=>{
            if(err){
                logger.error("error retreiving pending request count", "socketLib : eventEmitter on 'request-count", 9);
                let socketResponse = response.generate(true, "error retreiving pending requests count", 500, err);
                let data = {userId : request, requestCount : socketResponse, request : request};
                eventEmitter.emit('error-occurred', data);
            }else if(check.isEmpty(result)){
                logger.error("no pending requests", "socketLib : eventEmitter on 'request-count", 9);
                let socketResponse = response.generate(true, "no pending requests found", 404, null);
                let data = {userId : request, requestCount : socketResponse, request : request};
                eventEmitter.emit('error-occurred', data);
            }else {
                logger.info("pending requests count found", "socketLib : eventEmitter on 'request-count", 9);
                let socketResponse = response.generate(false, "pending requests count found", 200, result);
                let data = {userId : request, requestCount : socketResponse, request : request};
                eventEmitter.emit('pending-count', data);
            }
        })
})


eventEmitter.on('get-all-todo-users',(request)=>{
    UserModel.find()
    .select('-__v -_id -password -createdOn')
    .exec((err, result)=>{
        if(err){
            logger.error("error retreiving todo user details", "socketLib : eventEmitter on get-all-todo-users", 9);
            let socketResponse = response.generate(true, "error retreiving todo app users", 500, err);
            let data = {userId : request, todoUsers : socketResponse, request : request};
            eventEmitter.emit('error-occurred', data);
        }else if(check.isEmpty(result)){
            logger.error("no users found", "socketLib : eventEmitter on get-all-todo-users", 9);
            let socketResponse = response.generate(true, "no users found", 404, null);
            let data = {userId : request, todoUsers : socketResponse, request : request};
            eventEmitter.emit('error-occurred', data);
        }else {
            logger.info("todo users found", "socketLib : eventEmitter on get-all-todo-users", 9);
            let socketResponse = response.generate(false, "todo app users found", 200, result);
            let data = {userId : request, todoUsers : socketResponse};
            eventEmitter.emit('send-todo-users', data);
        }
    })
})



// ----------- eventEmitter emitting events---------------------






module.exports = {
    setServer : setServer
}