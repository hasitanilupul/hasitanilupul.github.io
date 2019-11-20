const mongoose = require('mongoose');
const CartF = mongoose.model('cartF');


var request = require('http');


module.exports.newcartF = (req,res,next) =>{
    var CartF = new CartF();
    CartF.uId = req.body.roomId;
    CartF.fId = req.body.custId;
    CartF.name = req.body.roomtype;

    cartF.save((err,doc) =>{
        if(!err)
            res.send(doc);
        else
            res.send(err)
    })
}