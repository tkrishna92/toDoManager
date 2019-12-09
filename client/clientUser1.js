const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6InpmMlNWQ0tMIiwiaWF0IjoxNTc1ODc2MTEzNzUyLCJleHAiOjE1NzU5NjI1MTMsInN1YiI6ImF1dGhUb2tlbiIsImlzcyI6InRvRG9NYW5hZ2VyIiwiZGF0YSI6eyJ1c2VySWQiOiJvTFE1RGJuMyIsImZpcnN0TmFtZSI6IkhhcmkiLCJsYXN0TmFtZSI6IkhhcmFuIiwiZW1haWwiOiJoYXJpMkBzb21lZG9tYWluLmNvbSIsIm1vYmlsZU51bWJlciI6MTIzNDU2Nzg5MCwiY291bnRyeUNvZGUiOiIrOTEiLCJyb29tSWQiOiJqSVBjcVAxVmIifX0.X38wSS7tGlj2uOUjOQn63MxEHTMuYOhz3h2dKIR19F4";
const userId = "oLQ5Dbn3";
const roomId = "jIPcqP1Vb";
const userName = "hari haran";

let listRequest = {
    listOwner : userId,
    userId : userId
}


let chatSocket = ()=>{

    //------------------------------------ listening events----------------------


    // ngoninit() verify user
    socket.on('verifyUser',()=>{
        console.log("verify event received")
        console.log(authToken);
        socket.emit('auth-user', (authToken));
    })

    // socket join friends room test
    socket.on('friend-test',(data)=>{
        console.log(data);
    })

    // get online-user-list 
    socket.on('online-user-list',(onlineUsers)=>{
        console.log("received online user list")
        console.log(onlineUsers);
    })

    // to get the user lists and user friends
    socket.on(userId, (data)=>{
        
        if(data.userList){
            console.log("user's lists data : ");
            console.log(data)
        }else if(data.userFriends){ // it should contain userFriends
            console.log("user's friends data : ");
            console.log(data.userFriends);
        }else{
            console.log("error data"+data);
            console.log(data.socketResponse);
        }
    })


    //----------------------- notifcations listening events--------------------------------

    // socket creates a friend request notification on "friend-request-notifcation"
    socket.on('friend-request-notification', ((data)=>{
        console.log("friend-request-notification")
        console.log(`${data.senderName} ${data.message} ${data.receiverName}`)
    }))





    socket.on('typing',(data)=>{
        console.log(data + " is typing");
    })

    $('#send').on('click', ()=>{
        let createdTime = Date.now();
        let messageText = $('#messageToSend').val();
        chatMessageObj.message = messageText;
        chatMessageObj.createdOn = createdTime;
        console.log(chatMessageObj);
        socket.emit('chat-msg', chatMessageObj);
    })

     $('#messageToSend').on('keypress', ()=>{
        console.log("emiting typing");
        socket.emit('typing', "kiran rao");
    })


    // -------------------- emiting events-------------------------------------------

    // on login emit listRequest
    socket.emit('get-user-lists',(listRequest));
    

    // on clicking on a user emit get-user-lists
    $('#getUserList').on('click', ()=>{
        let listRequest = {
            userId : userId,
            listOwner : $('#listOwner').val()
        }
        socket.emit('get-user-lists', (listRequest));
    })


    //-------------------- emiting notification events------------------------------

    // on sending a friend request and getting a success response
    $('#sendFriendRequestNotification').on('click', ()=>{
        let data = {
            friendName: userName,
            isFriend: false,
            userId: $('#userId').val(), // friend request to userId
            friendId: userId,  
            friendRoom: roomId,
            notificationMessage : "sent a friend request to"
        }
        socket.emit('friend-request', data);
    })

    // on accepting a friend request and getting a success response
    $('#sendAcceptRequestNotification').on('click', ()=>{
        let data = {
            friendName: userName,
            isFriend: false,
            userId: $('#acceptedUserId').val(), // friend request by userId
            friendId: userId,  
            friendRoom: roomId,
            notificationMessage : "accepted friend request of"
        }
        socket.emit('friend-request', data);
    })

    //on creating a list and getting a success response
    $('#sendCreateListNotification').on('click', ()=>{
        let data = {
            roomId : roomId,
            notificationMessage : "created a new list",
            userName : userName
        }
        socket.emit('list-action', data);
    })



}

chatSocket();
