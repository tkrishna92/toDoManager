const mongoose = require('mongoose');
const events = require('events');
const socketio = require('socket.io');
const eventEmitter = new events.EventEmitter();

const logger = require('./loggerLib');
const check = require('./checkLib');
const token = require('./tokenLib');

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
                    socket.emit("error occurred", {status : 500, error : 'invalid token provided'});
                }else {

                    let currentUser = user.data;
                    console.log(currentUser);
                    socket.userId = currentUser.userId;

                    let fullName = `${currentUser.firsName} ${currentUser.lastName}`;

                    let userObj = {userId : currentUser.userId, fullName : fullName};

                    onlineUsers.push(userObj);

                    socket.room = 'toDoUsers';
                    // updating the online list to everyone 
                    socket.join(socket.room).broadcast.emit('online-user-list', onlineUsers);


                    

                }
            })
        })
    })
}

module.exports = {
    setServer : setServer
}