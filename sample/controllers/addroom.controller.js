const mongoose = require('mongoose');
const Addroom = mongoose.model('addrooms');
const Room = require('../models/addroom.model');

var express = require('express');


module.exports.newroom = (req, res, next) => {
    var addroom = new Addroom();
    //addroom._id = req.body._id;
    addroom.type = req.body.type;
    addroom.price = req.body.price;
    addroom.catagory = req.body.catagory;
    addroom.ac = req.body.ac;
    addroom.capacity = req.body.capacity;
    addroom.save((err, doc) => {
        if (!err)
            res.send(doc);
        else
            res.send(err)
    })
}



module.exports.rooms = (req, res, next) => {
    Room.find(
        function (err, r) {
            if (err)
                res.status(404).send({ status: false, message: 'Room record not found.!!' });
            else
                res.status(200).send({ status: true, room: r });
        }
    );
}


module.exports.uproom = (req, res, next) => {
    Addroom.findById(req.body._id, (err, addroom) => {
        if (err)
            res.status(500).json({ errmsg: err });
        addroom.type = req.body.type;
        addroom.price = req.body.price;
        addroom.catagory = req.body.catagory;
        addroom.ac = req.body.ac;
        addroom.capacity = req.body.capacity;
        addroom.save((err, addroom) => {
            if (err)
                res.status(500).json({ errmsg: err });

            res.status(200).json({ msg: addroom })
        })
    })
}

module.exports.delete = (req, res, next) => {
    Room.findByIdAndRemove(req.params._id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in deleting') }
    })
}



