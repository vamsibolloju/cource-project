const mongoose = require('mongoose');

const validateZipCode = zipCode => /^\d{6}$/.test(zipCode)
const validateMobileNumber = mobileNumber => /^\d{10}$/.test(mobileNumber)

const addressModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is mandatory']        
    },
    contactNumber: {
        type: Number,
        required: [true, 'Contact number is mandatory'],
        validate: [validateMobileNumber, 'Invalid contact number!' ]
    },
    street: {
        type: String,
        required: [true, 'Street is mandatory']
    },
    landmark: {
        type: String,
        required: [true, 'Landmark is mandatory'],
    },
    city: {
        type: String,
        required: [true, 'City is mandatory'],
    },
    state: {
        type: String,
        required: [true, 'State is mandatory']
    },
    zipCode: {
        type: Number,
        required: [ true, 'ZIP code is mandatory' ],
        validate: [validateZipCode, 'Invalid zip code!' ]
    },
    createdAt: {
        type: Date,
        default: (new Date())
    },
    updatedAt: {
        type: Date,
        default: (new Date())
    }
});

module.exports = mongoose.model("Address", addressModel);