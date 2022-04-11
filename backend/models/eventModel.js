const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        maxlength: [30, "Name cannot exceed 30 characters"],
        minlength: [3, "Name should have more than 3 characters"],
    },
    date: {
        type: Date,
        required: [true, "Please Enter Event Date"]
    },
    avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
    },
    time: {
        type: String,
        required: [true, "Please Enter Event Time"]
    },
    participants: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("Events", eventSchema);