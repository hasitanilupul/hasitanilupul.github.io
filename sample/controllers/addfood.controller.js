const mongoose = require('mongoose');
const Addfood = mongoose.model('addfoods');
const Food = require('../models/addfood.model');

module.exports.newfood = (req, res, next) => {
    var addfood = new Addfood();
    addfood.type = req.body.type;
    addfood.name = req.body.name;
    addfood.price = req.body.price;
    addfood.save((err, doc) => {
        if (!err)
            res.send(doc)
        else
            res.send(err)
    })
}

module.exports.foodDetails = (req, res, next) => {
    Food.find(
        function (err, r) {
            if (err)
                res.status(404).send({ status: false, message: 'Food item not found' });
            else
                res.status(200).send({ status: true, food: r });
        }
    )
}

module.exports.foods = (req, res, next) => {
    Food.find(
        function (err, r) {
            if (err)
                res.status(404).send({ status: false, message: 'Food item not found' });
            else
                res.status(200).send({ status: true, food: r });
        }
    )
}

module.exports.upfood = (req, res, next) => {
    Addfood.findById(req.body._id, (err, addfood) => {
        if (err)
            res.status(500).json({ errmsg: err });
        addfood.type = req.body.type;
        addfood.name = req.body.name;
        addfood.price = req.body.price;
        addfood.save((err, addfood) => {
            if (err)
                res.status(500).json({ errmsg: err });

            res.status(200).json({ msg: addfood })
        })
    })
}

module.exports.deletefood = (req, res, next) => {
    Food.findByIdAndRemove(req.params._id, (err, doc) => {
        if (!err){ res.send(doc);}
        else{console.log('Error in deleting')}
    })
}