const mongoose = require('mongoose');
const Rating = mongoose.model('ratings');
const Rate = require('../models/rating.model');

const multer = require('multer');
const upload = multer({ dest: 'upload/' });

module.exports.newrate = (req, res, next) => {
    // const url = req.protocol + '://' + req.get('host')
    var rating = new Rating();
    rating.name = req.body.name;
    rating.comment = req.body.comment;
    rating.image = req.body.imagg;
    // rating.img = url + '/public' + req.file.filename
    rating.save((err, doc) => {
        if (!err){
            console.log("Ping")
            res.send(doc);
        }
        else{
            console.log("err")
            res.send(err)
        }
    })
}

module.exports.ratingDetails = (req, res, next) => {
    Rate.find(
        
        function(err, r){
            if(err)
                res.status(404).send({ status:false, message:'Comment not found'});
            else
                res.status(200).send({ status:true, rate: r});
        }
    );
}

module.exports.rates = (req, res, next) =>{
    Rate.find(     
        function(err, r) {
            if (err)
                res.status(404).send({ status: false, message: 'Comment not found' });
            else
                res.status(200).send({ status: true, rate : r });
        }
    );
}

module.exports.deleteitem = (req, res, next) => {
    Rate.findByIdAndRemove(req.params._id, (err, doc) => {
        if (!err){ res.send(doc);}
        else{console.log('Error in deleting')}
    })
}