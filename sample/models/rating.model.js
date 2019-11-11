const mongoos = require('mongoose');

var ratingSchema = new mongoos.Schema({
    name:{
        type:String
    },
    comment:{
        type:String
    },
    image:{
        type: String
    },
})

ratingSchema.pre('save',function(next){
    next();
})

module.exports = mongoos.model('ratings',ratingSchema);