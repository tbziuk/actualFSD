const mongoose = require('mongoose');

const Book = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Book', Book)