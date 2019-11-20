const mongoose = require('mongoose');

var foodOrder = new mongoose.Schema({
    items: [
        {
            food: { type: mongoose.Schema.Types.ObjectId, ref: 'addfoods' },
            quantity: Number
        }
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},
    { collection: 'FoodOrder' }
)

module.exports = mongoose.model('FoodOrder', foodOrder);