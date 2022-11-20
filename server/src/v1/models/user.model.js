const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

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

userSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(this.password, salt)
        this.password = hashPassword
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.isCheckPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        next(error)
    }
}

module.exports = mongoose.model('users', userSchema)