const mongoose = require('mongoose');

const productModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'First name is mandatory']        
    },
    category: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false,
    },
    description: {
        type: String,
        required: false
    },
    manufacturer: {
        type: String,
        required: [true, 'manufacturer is mandatory'],
    },
    availableItems: {
        type: Number,
        required: false,
        default: 0
    },
    createdAt: {
        type: Date,
        default: (new Date())
    },
    createdAt: {
        type: Date,
        default: (new Date())
    }

});

module.exports = mongoose.model("Product", productModel);
