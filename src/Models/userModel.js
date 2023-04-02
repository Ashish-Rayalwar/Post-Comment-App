
const mongoose = require('mongoose')


const userModel = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLen: 8,
        maxLen: 15,
        trim: true
    }

}, { timestamps: true })


module.exports = mongoose.model('User', userModel)