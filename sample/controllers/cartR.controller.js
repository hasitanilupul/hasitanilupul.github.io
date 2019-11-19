const mongoose = require('mongoose');
const CartR = mongoose.model('cartR');
const Cart = require('../models/cartR.model');


var request = require('http');
// request('http://www.google.com', function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body) // Print the google web page.
//      }
// })


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
            else{
                
                // var roomList = [];

                // for(let x of r){

                   
                //    rID = x['roomId'];
                //    cID = x['custId'];
                //    console.log(rID);
                //    console.log(cID);

                //     request.get('http://localhost:3000/api/findRoomByDocumnetID/' + cID, function (res) {
  
                //         // Buffer the body entirely for processing as a whole.
                //         var bodyChunks = [];
                //         res.on('data', function(chunk) {
                //           bodyChunks.push(chunk);
                //         }).on('end', function() {
                //           var body = Buffer.concat(bodyChunks);
                //           var parsed = JSON.parse(body);
                //             roomList.push(parsed);
                //             console.log(parsed);
                         
                //         })
                //       });
                      
                //       req.on('error', function(e) {
                //         console.log('ERROR: ' + e.message);
                //       });

                // }

                // console.log(roomList);
                res.status(200).send({ status:true, cart: r});
            }
               
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