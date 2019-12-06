const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let ListSchema = new Schema({
    listTitle : {type : String, required : true},
    listOwner : {type : String, default : ''},
    listDescription : {type : String, default : ''},
    listId : {type : String, unique : true, index : true},
    listCreatedOn : {type : Date, default : ''},
    listStatus : {type : String, default : 'open'},
})

mongoose.model('List', ListSchema);