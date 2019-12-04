const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let User = new Schema({
    userId : {
        type : String,
        default : '',
        index : true,
        unique : true
    },
    password :{
        type : String,
        default : '******'
    },
    firstName : {
        type : String,
        default : ''
    },
    lastName : {
        type : String,
        default : ''
    },
    email : {
        type : String,
        default : ''
    },
    mobileNumber : {
        type : Number,
        default : ''
    },
    countryCode : {
        type : String,
        default : ''
    },
    createdOn : {
        type : String,
        default : ''
    }
})

mongoose.model('User', User);