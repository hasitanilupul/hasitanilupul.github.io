const mongoose = require('mongoose')

var addfoodSchema = new mongoose.Schema({

    type:{
        type:String
    },
    name:{
        type:String
    },
    price:{
        type:String
    }
})

addfoodSchema.pre('save',function (next){
    next();
})

module.exports = mongoose.model('addfoods',addfoodSchema);