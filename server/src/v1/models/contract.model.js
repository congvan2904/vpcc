const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contractSchema = new Schema({
    id_contract: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean,
        default: true
    },
    id_user_secretary: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    id_user_notary: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    date_create: {
        type: Date,
        default: Date.now
    },
    note: {
        type: String
    }
},
    { timestamps: true })
module.exports = mongoose.model('contract', contractSchema)

