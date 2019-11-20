const mongoose = require('mongoose');
const Order = mongoose.model('FoodOrder');

module.exports.add = (req, res) => {
    var order = new Order(req.body);
    order.save((err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
}

module.exports.getByUser = (req, res) => {
    Order.find({
        user: req.params.uid
    }, (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    }).populate('items.food')
}

module.exports.getAll = (req, res) => {
    Order.find({
    }, (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    }).populate('items.food')
}