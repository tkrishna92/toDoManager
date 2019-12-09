const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjZQelBWdDQtIiwiaWF0IjoxNTc1ODc2MTQ2NDA3LCJleHAiOjE1NzU5NjI1NDYsInN1YiI6ImF1dGhUb2tlbiIsImlzcyI6InRvRG9NYW5hZ2VyIiwiZGF0YSI6eyJ1c2VySWQiOiJhQWc3OE5ETSIsImZpcnN0TmFtZSI6IkhhcmkiLCJsYXN0TmFtZSI6IkhhcmFuIiwiZW1haWwiOiJoYXJpM0Bzb21lZG9tYWluLmNvbSIsIm1vYmlsZU51bWJlciI6MTIzNDU2Nzg5MCwiY291bnRyeUNvZGUiOiIrOTEiLCJyb29tSWQiOiJJeW40MFFWOFkifX0.jjW8V9aj0xbjlb_VyCh5I6NTh3P-8OCfX2E5nqPsLEs";
const userId = "aAg78NDM";
const roomId = "Iyn40QV8Y";
const userName = "hari haran 2"

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

    // get online-user-list 
    socket.on('online-user-list',(onlineUsers)=>{
        console.log("received online user list")
        console.log(onlineUsers);
    })

    // socket join friends room test
    socket.on('friend-test',(data)=>{
        console.log(data);
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

    socket.on('friend-request-notification', ((data)=>{
        console.log(`${data.senderName} ${data.message} ${data.receiverName}`)
    }))



   

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

    
}

chatSocket();
