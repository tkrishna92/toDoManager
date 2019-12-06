const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let FriendSchema = new Schema({
    userId : {type : String, required : true},
    friendId : {type : String},
    friendName : {type : String, default : ''},
    isFriend : {type : Boolean, default : false},  // changes to true when the user with the userId accepts the request
    friendRoom : {type: String}  //for listening to the room using socket
})

mongoose.model('Friend', FriendSchema);