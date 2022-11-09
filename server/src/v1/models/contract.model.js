const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contractSchema = new Schema({
    id_contract: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean
    }
})
module.exports = mongoose.model('contract', contractSchema)

