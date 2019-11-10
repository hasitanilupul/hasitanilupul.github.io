const mongoose = require('mongoose');

var cartRSchema = new mongoose.Schema({
    roomId:{
        type:String
    },
    custId:{
        type:String
    },
    checkin:{
        type:String
    },
    checkout:{
        type:String
    },

},
{collection:'cartR'}
)






cartRSchema.pre('save',function(next){
    next();
})



module.exports = mongoose.model('cartR',cartRSchema);