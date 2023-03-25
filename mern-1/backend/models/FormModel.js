const mongoose = require('mongoose');

const Form = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Form', Form)