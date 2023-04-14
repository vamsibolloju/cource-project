const mongoose = require('mongoose');

const validateEmail = email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
const validateMobileNumber = mobileNumber => /^\d{10}$/.test(mobileNumber)

const userModel = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is mandatory']        
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        unique: [true, 'Email is already existed'],
        validate: [validateEmail, 'Invalid email-id format!'],
    },
    password: {
        type: String,
        required: [true, 'Password is mandatory']
    },
    contactNumber: {
        type: Number,
        required: [true, 'Contact number is mandatory'],
        validate: [validateMobileNumber, 'Invalid contact number!' ]
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: (new Date())
    },
    createdAt: {
        type: Date,
        required: false
    },
});

module.exports = mongoose.model("User", userModel);