const mongoose = require('mongoose');
const validator = require('validator');

const memberSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        maxlength: [30, "Name cannot exceed 30 characters"],
        minlength: [3, "Name should have more than 3 characters"],
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    events: {
        type: Array,
        default: []
    },
    phone: {
        type: Number,
        required: [true, "Please Enter Your Phone Number"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    }
});

module.exports = mongoose.model("Member", memberSchema);