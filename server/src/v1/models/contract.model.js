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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})
module.exports = mongoose.model('contract', contractSchema)

