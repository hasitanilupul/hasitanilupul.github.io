const mongoose = require('mongoose');
const CartR = mongoose.model('cartR');
const Cart = require('../models/cartR.model');

module.exports.newcartR = (req,res,next) =>{
    var cartR = new CartR();
    cartR.roomId = req.body.roomId;
    cartR.custId = req.body.custId;
    cartR.roomtype = req.body.roomtype;
    cartR.checkin = req.body.checkin;
    cartR.checkout = req.body.checkout;

    cartR.save((err,doc) =>{
        if(!err)
            res.send(doc);
        else
            res.send(err)
    })
}

module.exports.roomcartDetails = (req, res, next) => {
    Cart.find(
        
        function(err, r){
            if(err)
                res.status(404).send({ status:false, message:'Comment not found'});
            else
                res.status(200).send({ status:true, cart: r});
        }
    );
}

module.exports.carts = (req, res, next) =>{
    Cart.find(     
        function(err, r) {
            if (err)
                res.status(404).send({ status: false, message: 'Comment not found' });
            else
                res.status(200).send({ status: true, cart : r });
        }
    );
}