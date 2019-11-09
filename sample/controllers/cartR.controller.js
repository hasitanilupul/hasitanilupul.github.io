const mongoose = require('mongoose');
const CartR = mongoose.model('cartR');

module.exports.newcartR = (req,res,next) =>{
    var cartR = new CartR();
    cartR.roomId = req.body.roomId;
    cartR.custId = req.body.custId;
    cartR.save((err,doc) =>{
        if(!err)
            res.send(doc);
        else
            res.send(err)
    })
}
