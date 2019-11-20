const mongoos = require('mongoose');

var paymentSchema = new mongoos.Schema({
    roomtype:{
        type:String
    },
    price:{
        type:String
    },
    fname:{
        type: String
    },
    lname:{
        type: String
    },
})

paymentSchema.pre('save',function(next){
    next();
})

module.exports = mongoos.model('payment',paymentSchema);