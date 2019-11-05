const mongoose = require('mongoose');



var addroomSchema = new mongoose.Schema({
    // _id:{
    //     type:String
    // },
    type:{
        type:String
    },
    price:{
        type:String
    },
    catagory:{  
        type:String
    },
    ac:{
        type:String
    },
    capacity:{
        type:String
    }

    
})

addroomSchema.pre('save',function (next){
    next();
})

module.exports = mongoose.model('addrooms',addroomSchema);