const mongoose = require('mongoose');

var cartFSchema = new mongoose.Schema({
    uId:{
        type:String
    },
    fid:{
        type:String
    },
    name:{
        type:String
    }

},
{collection:'cartF'}
)






cartFSchema.pre('save',function(next){
    next();
})



module.exports = mongoose.model('cartF',cartFSchema);