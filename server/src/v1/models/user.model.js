const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    fullname: {
        type: String
    },
    phonenumber: {
        type: String
    },
    email: {
        type: String,
        lowercase: true
    },
    role: {
        type: String
    },
    position: {
        type: String
    },
    imagepath: {
        type: String
    },
    note: {
        type: String
    }
}, { timestamps: true })
module.exports = mongoose.model('users', userSchema)