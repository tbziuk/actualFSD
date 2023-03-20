const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    address: {
        street: String,
        suite: String,
        city: String,
        zipcode: String,
        geo: {
            lat: Number,
            lng: Number,
        }
    },
    phone: String,
    website: String,


}, {
    timestamps: true
})

module.exports = mongoose.model('User', User)