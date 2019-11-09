const mongoose = require('mongoose');
const CartR = mongoose.model('cartR');
//  const cart = require('../models/cartR.model');

module.exports.newcartR = (req,res,next) =>{
    var cartR = new CartR();
    cartR.roomId = req.body.roomId;
    cartR.save((err,doc) =>{
        if(!err)
            res.send(doc);
        else
            res.send(err)
    })
}
