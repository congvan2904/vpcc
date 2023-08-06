const mongoose = require('mongoose')
const Schema = mongoose.Schema

const borrowingSchema = new Schema({
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    id_contract: {
        type: Schema.Types.ObjectId,
        ref: 'contract'
    },
    status: {
        type: Boolean,
        default: true
    },
    kind: {
        type: String
    },
    create_Date: {
        type: Date,
    },
    reason: {
        type: String
    },

    borrowDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date,
    },
    note: {
        type: String
    }
},
    { timestamps: true })
module.exports = mongoose.model('borrowing', borrowingSchema)

