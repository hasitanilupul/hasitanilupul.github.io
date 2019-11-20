const mongoose = require('mongoose');
const Rating = mongoose.model('ratings');
const Payment = require('../models/payment.model');


module.exports.newpayment = (req, res, next) => {
    // const url = req.protocol + '://' + req.get('host')
    var payment = new Payment();
    payment.roomtype = req.body.roomtype;
    payment.price = req.body.price;
    payment.custId = req.body._id;
    
    
    payment.save((err, doc) => {
        if (!err)
            
            res.send(doc);
        
        else{
            console.log("err")
            res.send(err)
            
        }
    })
}