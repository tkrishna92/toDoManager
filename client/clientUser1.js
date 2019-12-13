const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IlAwcUZ3SzdfIiwiaWF0IjoxNTc1OTYwNTI1MTQ0LCJleHAiOjE1NzYwNDY5MjUsInN1YiI6ImF1dGhUb2tlbiIsImlzcyI6InRvRG9NYW5hZ2VyIiwiZGF0YSI6eyJ1c2VySWQiOiJhQWc3OE5ETSIsImZpcnN0TmFtZSI6ImZpcnN0IiwibGFzdE5hbWUiOiJ1c2VyIiwiZW1haWwiOiJoYXJpM0Bzb21lZG9tYWluLmNvbSIsIm1vYmlsZU51bWJlciI6MTIzNDU2Nzg5MCwiY291bnRyeUNvZGUiOiIrOTEiLCJyb29tSWQiOiJJeW40MFFWOFkifX0.kt5YzfepECMD_LW3mr8eBYHzLIdzchjQFfdeQF1J1K8";
const userId = "oLQ5Dbn3";
const roomId = "jIPcqP1Vb";
const userName = "first user";

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

    // socket on error
    socket.on('error-occurred', (data)=>{
        console.log("error response received");
        console.log(data)
    })


    // socket join friends room test
    socket.on('friend-test',(data)=>{
        console.log(data);
    })

    

    // to get the user lists and user friends
    socket.on(userId, (data)=>{
        
        
        // let userList = data.userList;
        // console.log(userList)

        // let userFriends = data.userFriends;
        // console.log(userFriends);

        // let errorData = data.socketResponse;
        // console.log(errorData);
        if(data.userList){
            if(data.requestDetails.listStatus == "open"){
            console.log("user's open lists data : ");
            console.log(data)
            }else{
                console.log("user's old lists data : ");
                console.log(data)
            }
        }else if(data.userFriends){ // it should contain userFriends
            console.log("user's friends data : ");
            console.log(data.userFriends);
        }else if(data.onlineUsersList){ // it should contain online users list
            console.log("online users list : ");
            console.log(data.onlineUsersList);
        }else if(data.response.data){
            console.log("list items received");
            console.log(data.response.data);
        }
    })


    //----------------------- notifcations listening events--------------------------------

    // socket creates a friend request notification on "friend-request-notifcation"
    socket.on('friend-request-notification', ((data)=>{
        console.log("friend-request-notification")
        console.log(`${data.senderName} ${data.message} ${data.receiverName}`)
    }))

     // on list notifications
     socket.on('action-notification',(data)=>{
        console.log(data);
        console.log("action notification received")
        console.log(data.message);
        
        console.log(data.details);
        if(data.details.actionOnList){
            socket.emit('get-user-lists',(data.details.listOwner));
        }else{
            socket.emit('get-list-items', (data.details));
        }
        
        
    })



    

    // -------------------- emiting events-------------------------------------------


    
    // on authentication call events for getting user's list and user's friend list
    let request = {
        userId : userId,
        listOwner : userId,
        listStatus : "open"
    }
    let oldRequest = {
        userId : userId,
        listOwner : userId,
        listStatus : "done"
    }
    socket.emit('get-user-lists',(request));
    socket.emit('get-user-lists',(oldRequest));
    socket.emit('get-friends', (request));
    socket.emit('join-friends-rooms',(request));
    socket.emit('get-online-users', (request));
    socket.emit('friend-request-count', request);
    

    // on clicking on a user emit get-user-lists
    $('#getUserList').on('click', ()=>{
        let listRequest = {
            userId : userId,
            listOwner : $('#listOwner').val()
        }
        socket.emit('get-user-lists', (listRequest));
    })

    // on clicking on a list it emits "get-list-items"
    $('#getListItem').on('click', ()=>{
        let itemRequest = {
            userId : userId,
            listId : $('#listId').val()
        }
        socket.emit('get-list-items', (itemRequest));
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
            userName : userName,
            listOwner : $('#listOwner').val(), // from the response
            listStatus : $('#listStatus').val(), // from the response
            actionOnList : true
        }
        socket.emit('list-action', data);
        socket.emit('get-user-lists', data);
    })

    // on creating a new item and getting success response
    $('#sendCreateItemNotification').on('click',()=>{
        let data = {
            roomId : roomId,
            notificationMessage : "created a new item",
            userName : userName,
            userId : userId,
            listId : $('#listId').val(), // from the response
            actionOnList : false

        }
        socket.emit('list-action', data);
        socket.emit('get-list-items', data);
    })


}

chatSocket();
