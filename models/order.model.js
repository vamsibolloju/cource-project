const mongoose = require('mongoose');

const orderModel = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product id mandatory']        
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: [true, 'Address id is mandatory'],
    },
    quantity: {
        type: Number,
        required: false,
        default: 1
    },
    orderDate: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("Order", orderModel);
