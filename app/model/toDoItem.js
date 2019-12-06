const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
let ItemSchema = new Schema({
    listId : {type : String},
    title : {type : String, default : ''},
    description : {type : String, default : ''},
    itemId : {type : String, unique : true, index : true},
    previousId : {type : String, default : ''},
    nextId : {type : String, default : ''},
    owner : {type : String, default : ''},
    createdOn : {type : Date, default : ''},
    dueDate : {type : Date, default : ''},
    modifiedBy : {type : String, default : ''},
    modifiedOn : {type : Date, default : ''},
    parent : {type : String, default : ''},
    children : {type : Array, default : []},
    status : {type : String, default : 'open'},
    isHidden : {type : Boolean, default : false},
    isPrivate : {type : Boolean, default : true},
    privilegedAuthorId : {type : Array, default : []}
})

mongoose.model('Item', ItemSchema);